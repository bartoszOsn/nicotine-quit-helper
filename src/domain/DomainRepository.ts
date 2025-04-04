import { inject, Injectable } from '@angular/core';
import { Repository } from '../api/Repository';
import { combineLatest, defer, map, Observable, timer } from 'rxjs';
import { CurrentPouchState } from '../api/model/CurrentPouchState';
import { DayTimeState } from '../api/model/DayTimeState';
import { PouchUsage } from '../api/model/PouchUsage';
import { Store } from '@ngrx/store';
import { AppState } from './ngrx/AppState';
import { selectLastPouchUsage, selectPouchLimitForSelectedDay, selectPouchUsage, selectSelectedDay } from './ngrx/selectors';
import { addPouchUsageAction, nextDayAction, previousDayAction, setLimitForSelectedDayAction } from './ngrx/actions';
import { DomainService } from './DomainService';

@Injectable()
export class DomainRepository extends Repository {
	private readonly store = inject(Store<AppState>);
	private readonly domainService = inject(DomainService);

    override selectedDay$: Observable<Date> = this.store.select(selectSelectedDay);
    override pouchLimitForSelectedDay$: Observable<number | null> = this.store.select(selectPouchLimitForSelectedDay);
	override readonly pouchesUsage$: Observable<Array<PouchUsage>> = this.store.select(selectPouchUsage);

	override readonly canEditLimitOnSelectedDay$: Observable<boolean> = defer(() => this.selectedDayTimeState$)
		.pipe(map(state => this.domainService.canEditLimitOnSelectedDay(state)));

	override selectedDayTimeState$: Observable<DayTimeState> = defer(() => this.selectedDay$)
		.pipe(map(day => this.domainService.getSelectedDayTimeState(day)))

	override readonly suggestedPouchUsage$: Observable<Array<PouchUsage>> = combineLatest([
		this.pouchesUsage$,
		this.pouchLimitForSelectedDay$,
		defer(() => this.now$)
	])
		.pipe(map(([usage, limit, now]) => this.domainService.getSuggestedPouchUsage(usage, limit, now)));

	override showSuggestedPouchUsage$: Observable<boolean> = defer(() => this.selectedDayTimeState$)
		.pipe(map(state => this.domainService.canShowSuggestedPouchUsage(state)));

	override readonly pouchesLeft$: Observable<number> = combineLatest([
		this.pouchLimitForSelectedDay$,
		this.pouchesUsage$
	])
		.pipe(
			map(([limit, pouches]) => this.domainService.getPouchesLeft(limit, pouches))
		);

	override readonly currentPouchState$: Observable<CurrentPouchState> = combineLatest([
		defer(() => this.now$),
		this.store.select(selectLastPouchUsage)
	])
		.pipe(
			map(([now, lastPouch]) => this.domainService.getCurrentPouchState(lastPouch, now))
		)

	private now$ = timer(0, 1000).pipe(map(() => new Date()));

	override previousDay(): void {
		this.store.dispatch(previousDayAction());
	}
	override nextDay(): void {
		this.store.dispatch(nextDayAction());
	}

	override setLimitForSelectedDay(limit: number): void {
		this.store.dispatch(setLimitForSelectedDayAction({ limit }));
    }

    override usePouch(): void {
		const usage: PouchUsage = { dateTime: new Date() };
        this.store.dispatch(addPouchUsageAction({ usage }));
    }
}