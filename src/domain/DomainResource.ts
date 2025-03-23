import { PouchUsage } from './model/PouchUsage';

export abstract class DomainResource {
	abstract fetchPouchLimitForDay(day: Date): Promise<number>;
	abstract setPouchLimitForDay(day: Date, limit: number): Promise<void>;

	abstract fetchPouchUsageForDay(day: Date): Promise<Array<PouchUsage>>;
	abstract addPouchUsageForDay(usage: PouchUsage): Promise<void>;
}