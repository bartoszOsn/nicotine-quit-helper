import { inject, Injectable } from '@angular/core';
import { Store } from '../api/Store';
import { BehaviorSubject, combineLatest, defer, EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';
import { CurrentPouchState } from '../api/model/CurrentPouchState';
import { DomainResource } from './DomainResource';

@Injectable()
export class DomainStore extends Store {
    override selectedDay$: Observable<Date> = defer(() => this.selectedDaySubject.asObservable());
    override pouchLimitForSelectedDay$: Observable<number | null> = defer(() => combineLatest([
		this.selectedDay$,
		this.refreshPouchLimitForSelectedDaySubject.asObservable()
	])).pipe(
		switchMap(([day]) => this.domainResource.fetchPouchLimitForDay(day))
	)
    override pouchesUsedSelectedDay$: Observable<number> = EMPTY;
    override pouchesLeftForSelectedDay$: Observable<number> = EMPTY;
    override lastPouchUsedAt$: Observable<Date> = EMPTY;
    override currentPouchState$: Observable<CurrentPouchState> = EMPTY;

	private readonly domainResource = inject(DomainResource);

	private selectedDay: Date = new Date();
	private readonly selectedDaySubject = new BehaviorSubject<Date>(this.selectedDay);

	private readonly refreshPouchLimitForSelectedDaySubject = new BehaviorSubject<void>(void 0);

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
        return EMPTY;
    }

}