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

	private selectedDay: Date = new Date();
	private readonly selectedDaySubject = new BehaviorSubject<Date>(this.selectedDay);

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

	override setLimitForDay(day: Date, limit: number): Observable<void> {
        return EMPTY;
    }
    override usePouch(): Observable<void> {
        return EMPTY;
    }

}