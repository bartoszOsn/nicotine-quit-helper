import { inject, Injectable } from '@angular/core';
import { Repository } from '../api/Repository';
import { BehaviorSubject, combineLatest, defer, map, Observable, of, switchMap, tap, timer } from 'rxjs';
import { CurrentPouchState } from '../api/model/CurrentPouchState';
import { DomainResource } from './DomainResource';
import { DayTimeState } from '../api/model/DayTimeState';
import { PouchUsage } from '../api/model/PouchUsage';
import { Store } from '@ngrx/store';
import { AppState } from './ngrx/AppState';
import { DomainConverter } from './DomainConverter';
import { selectSelectedDay } from './ngrx/selectors';
import { nextDayAction, previousDayAction } from './ngrx/actions';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class DomainRepository extends Repository {
	private readonly POUCH_USAGE_TIME = 30 * 60 * 1000;
	private readonly ALERT_TIME = 2 * 1000;

	private readonly store = inject(Store<AppState>);
	private readonly domainConverter = inject(DomainConverter);

    override selectedDay$: Observable<Date> = this.store.select(selectSelectedDay)
		.pipe(map(day => this.domainConverter.stringifiedToDate(day)));
    override pouchLimitForSelectedDay$: Observable<number | null> = defer(() => combineLatest([
		this.selectedDay$,
		this.refreshPouchLimitForSelectedDaySubject.asObservable()
	])).pipe(
		switchMap(([day]) => this.domainResource.fetchPouchLimitForDay(day))
	);

	override readonly canEditLimitOnSelectedDay$: Observable<boolean> = defer(() => this.selectedDayTimeState$)
		.pipe(
			map(state => state !== DayTimeState.PAST)
		)

	override selectedDayTimeState$: Observable<DayTimeState> = defer(() => this.selectedDay$)
		.pipe(
			map(day => {
				const now = new Date();
				if (day.getFullYear() === now.getFullYear() && day.getMonth() === now.getMonth() && day.getDate() === now.getDate()) {
					return DayTimeState.PRESENT;
				}
				if (day < now) {
					return DayTimeState.PAST;
				}
				return DayTimeState.FUTURE;
			})
		)

    override readonly pouchesUsage$: Observable<Array<PouchUsage>> = combineLatest([
		this.selectedDay$,
		defer(() => this.refreshPouchUsageForSelectedDaySubject)
	])
		.pipe(
			switchMap(([day]) => this.domainResource.fetchPouchUsageForDay(day))
		);

	override readonly suggestedPouchUsage$: Observable<Array<PouchUsage>> = combineLatest([
		this.pouchesUsage$,
		this.pouchLimitForSelectedDay$,
		defer(() => this.now$)
	])
		.pipe(
			map(([usage, limit, now]) => {
				if (limit === null) {
					return [];
				}

				if (usage.length >= limit) {
					return [];
				}

				const pouchesLeft = limit - usage.length;
				const timeStart = usage.length > 0 ? usage[usage.length - 1].dateTime : now;
				const timeEnd = new Date(now);
				timeEnd.setHours(23, 59, 59, 999);

				return Array.from({ length: pouchesLeft }).map((_, i) => {
					const t = (i + 1) / pouchesLeft;
					const time = new Date(timeStart.getTime() + t * (timeEnd.getTime() - timeStart.getTime()));
					return { dateTime: time };
				})
			})
		);

	override showSuggestedPouchUsage$: Observable<boolean> = defer(() => this.selectedDayTimeState$)
		.pipe(
			map(state => state === DayTimeState.PRESENT)
		)

	override readonly pouchesLeft$: Observable<number> = combineLatest([
		this.pouchLimitForSelectedDay$,
		this.pouchesUsage$
	])
		.pipe(
			map(([limit, pouches]) => {
				if (limit === null) {
					return 0;
				}

				if (pouches.length >= limit) {
					return 0;
				}

				return limit - pouches.length;
			})
		);

	override readonly currentPouchState$: Observable<CurrentPouchState> = combineLatest([
		defer(() => this.now$),
		this.pouchesUsage$
	])
		.pipe(
			concatLatestFrom(() => this.selectedDay$),
			switchMap(([[now, usages], selectedDay]): Observable<[Date, PouchUsage | null]> => {
				if (usages.length > 0) {
					return of([now, usages[usages.length - 1]]);
				}

				if (now.getTime() - selectedDay.getTime() < this.POUCH_USAGE_TIME + this.ALERT_TIME) {
					return this.lastPouchUsageOfPreviousDay$.pipe(map(usage => [now, usage]));
				}

				return of([now, null]);
			}),
			map(([now, lastPouch]) => {
				if (lastPouch === null) {
					return { type: 'no-pouch' };
				}
				if (now.getTime() - lastPouch.dateTime.getTime() < this.POUCH_USAGE_TIME) {
					const timeLeftInSeconds = Math.floor((this.POUCH_USAGE_TIME - (now.getTime() - lastPouch.dateTime.getTime())) / 1000);
					return {
						type: 'pouch-used',
						timeLeftInSeconds: timeLeftInSeconds,
						progress: 1 - timeLeftInSeconds / (this.POUCH_USAGE_TIME / 1000)
					};
				}

				if (now.getTime() - lastPouch.dateTime.getTime() < this.POUCH_USAGE_TIME + this.ALERT_TIME) {
					return { type: 'pouch-ready', lastPouch };
				}

				return { type: 'no-pouch' };
			})
		)

	private readonly domainResource = inject(DomainResource);

	private now$ = timer(0, 1000).pipe(map(() => new Date()));
	private lastPouchUsageOfPreviousDay$: Observable<PouchUsage | null> = this.selectedDay$.pipe(
		map(day => new Date(day.getTime() - 24 * 60 * 60 * 1000)),
		switchMap(day => this.domainResource.fetchPouchUsageForDay(day)),
		map(usages => {
			if (usages.length === 0) {
				return null;
			}
			return usages[usages.length - 1];
		})
	);

	private readonly refreshPouchLimitForSelectedDaySubject = new BehaviorSubject<void>(void 0);
	private readonly refreshPouchUsageForSelectedDaySubject = new BehaviorSubject<void>(void 0);

	override previousDay(): void {
		this.store.dispatch(previousDayAction());
	}
	override nextDay(): void {
		this.store.dispatch(nextDayAction());
	}

	override setLimitForSelectedDay(limit: number): Observable<void> {
		return this.selectedDay$.pipe(
			switchMap(selectedDay => this.domainResource.setPouchLimitForDay(selectedDay, limit)),
			tap(() => this.refreshPouchLimitForSelectedDaySubject.next(void 0)),
			map(() => void 0)
		);
    }
    override usePouch(): Observable<void> {
		const pouchUsage: PouchUsage = { dateTime: new Date() };
        return this.domainResource.addPouchUsageForDay(pouchUsage).pipe(
			tap(() => this.refreshPouchUsageForSelectedDaySubject.next(void 0))
		);
    }

}