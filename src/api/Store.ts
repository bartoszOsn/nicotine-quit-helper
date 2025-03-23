import { Observable } from 'rxjs';
import { CurrentPouchState } from './model/CurrentPouchState';

export abstract class Store {
	abstract readonly selectedDay$: Observable<Date>;
	abstract readonly pouchLimitForSelectedDay$: Observable<number>;
	abstract readonly pouchesUsedSelectedDay$: Observable<number>;
	abstract readonly pouchesLeftForSelectedDay$: Observable<number>;
	abstract readonly lastPouchUsedAt$: Observable<Date>;
	abstract readonly currentPouchState$: Observable<CurrentPouchState>;

	abstract setSelectedDay(day: Date): Observable<void>;
	abstract previousDay(): Observable<void>;
	abstract nextDay(): Observable<void>;

	abstract setLimitForDay(day: Date, limit: number): Observable<void>;
	abstract usePouch(): Observable<void>;
}