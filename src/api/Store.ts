import { Observable } from 'rxjs';
import { CurrentPouchState } from './model/CurrentPouchState';
import { DayTimeState } from './model/DayTimeState';
import { PouchUsage } from './model/PouchUsage';

export abstract class Store {
	abstract readonly selectedDay$: Observable<Date>;
	abstract readonly pouchLimitForSelectedDay$: Observable<number | null>;
	abstract readonly selectedDayTimeState$: Observable<DayTimeState>;

	abstract readonly pouchesUsage$: Observable<Array<PouchUsage>>;
	abstract readonly overLimit$: Observable<boolean>;
	abstract readonly currentPouchState$: Observable<CurrentPouchState>;

	abstract setSelectedDay(day: Date): Observable<void>;
	abstract previousDay(): Observable<void>;
	abstract nextDay(): Observable<void>;

	abstract setLimitForSelectedDay(limit: number): Observable<void>;
	abstract usePouch(): Observable<void>;
}