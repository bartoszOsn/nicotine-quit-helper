import { Injectable } from '@angular/core';
import { DomainResource } from '../domain/DomainResource';
import { PouchUsage } from '../domain/model/PouchUsage';

@Injectable()
export class IndexedDbResource extends DomainResource {
    override fetchPouchLimitForDay(day: Date): Promise<number> {
        throw new Error('Method not implemented.');
    }
    override setPouchLimitForDay(day: Date, limit: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    override fetchPouchUsageForDay(day: Date): Promise<Array<PouchUsage>> {
        throw new Error('Method not implemented.');
    }
    override addPouchUsageForDay(usage: PouchUsage): Promise<void> {
        throw new Error('Method not implemented.');
    }
}