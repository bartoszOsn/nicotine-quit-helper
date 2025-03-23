import { PouchUsage } from './model/PouchUsage';
import { Observable } from 'rxjs';

export abstract class DomainResource {
	abstract fetchPouchLimitForDay(day: Date): Observable<number>;
	abstract setPouchLimitForDay(day: Date, limit: number): Observable<void>;

	abstract fetchPouchUsageForDay(day: Date): Observable<Array<PouchUsage>>;
	abstract addPouchUsageForDay(usage: PouchUsage): Observable<void>;
}