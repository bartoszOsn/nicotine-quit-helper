import { inject, Injectable } from '@angular/core';
import { Store } from '../api/Store';
import { BehaviorSubject, combineLatest, defer, EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';
import { CurrentPouchState } from '../api/model/CurrentPouchState';
import { DomainResource } from './DomainResource';
import { DayTimeState } from '../api/model/DayTimeState';
import { PouchUsage } from '../api/model/PouchUsage';

@Injectable()
export class DomainStore extends Store {
    override selectedDay$: Observable<Date> = defer(() => this.selectedDaySubject.asObservable());
    override pouchLimitForSelectedDay$: Observable<number | null> = defer(() => combineLatest([
		this.selectedDay$,
		this.refreshPouchLimitForSelectedDaySubject.asObservable()
	])).pipe(
		switchMap(([day]) => this.domainResource.fetchPouchLimitForDay(day))
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

	override readonly overLimit$: Observable<boolean> = combineLatest([
		this.pouchLimitForSelectedDay$,
		this.pouchesUsage$
	])
		.pipe(
			map(([limit, usages]) => limit !== null && usages.length > limit)
		)

	override readonly currentPouchState$: Observable<CurrentPouchState> = EMPTY;

	private readonly domainResource = inject(DomainResource);

	private selectedDay: Date = new Date();
	private readonly selectedDaySubject = new BehaviorSubject<Date>(this.selectedDay);

	private readonly refreshPouchLimitForSelectedDaySubject = new BehaviorSubject<void>(void 0);
	private readonly refreshPouchUsageForSelectedDaySubject = new BehaviorSubject<void>(void 0);

    override setSelectedDay(day: Date): Observable<void> {
		this.selectedDay = day;
        this.selectedDaySubject.next(day);
		return of(void 0);
    }
	override previousDay(): Observable<void> {
		const previousDay = new Date(this.selectedDay.getTime() - 24 * 60 * 60 * 1000);
		return this.setSelectedDay(previousDay);
	}
	override nextDay(): Observable<void> {
		const nextDay = new Date(this.selectedDay.getTime() + 24 * 60 * 60 * 1000);
		return this.setSelectedDay(nextDay);
	}

	override setLimitForSelectedDay(limit: number): Observable<void> {
        return this.domainResource.setPouchLimitForDay(this.selectedDay, limit).pipe(
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