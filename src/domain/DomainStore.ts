import { Injectable } from '@angular/core';
import { Store } from '../api/Store';
import { BehaviorSubject, defer, EMPTY, Observable, of } from 'rxjs';
import { CurrentPouchState } from '../api/model/CurrentPouchState';

@Injectable()
export class DomainStore extends Store {
    override selectedDay$: Observable<Date> = defer(() => this.selectedDaySubject.asObservable());
    override pouchLimitForSelectedDay$: Observable<number> = EMPTY;
    override pouchesUsedSelectedDay$: Observable<number> = EMPTY;
    override pouchesLeftForSelectedDay$: Observable<number> = EMPTY;
    override lastPouchUsedAt$: Observable<Date> = EMPTY;
    override currentPouchState$: Observable<CurrentPouchState> = EMPTY;

	private readonly selectedDaySubject = new BehaviorSubject<Date>(new Date());

    override setSelectedDay(day: Date): Observable<void> {
        this.selectedDaySubject.next(day);
		return of(void 0);
    }
    override setLimitForDay(day: Date, limit: number): Observable<void> {
        return EMPTY;
    }
    override usePouch(): Observable<void> {
        return EMPTY;
    }

}