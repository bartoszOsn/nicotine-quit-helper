import { PouchUsage } from '../api/model/PouchUsage';
import { Observable } from 'rxjs';
import { Day } from '../util/time/model/Day';

export abstract class DomainResource {
	abstract fetchPouchLimitForDay(day: Day): Observable<number | null>;
	abstract setPouchLimitForDay(day: Day, limit: number): Observable<void>;

	abstract fetchPouchUsageForDay(day: Day): Observable<Array<PouchUsage>>;
	abstract addPouchUsageForDay(usage: PouchUsage): Observable<void>;
}