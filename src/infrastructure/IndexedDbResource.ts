import { Injectable } from '@angular/core';
import { DomainResource } from '../domain/DomainResource';
import { PouchUsage } from '../api/model/PouchUsage';
import { Observable, switchMap } from 'rxjs';
import { PouchLimitPerDayDao } from './dao/PouchLimitPerDayDao';
import { PouchUsageDao } from './dao/PouchUsageDao';

@Injectable()
export class IndexedDbResource extends DomainResource {
	private readonly DATABASE_NAME = 'nicotine-quit-helper';
	private readonly DATABASE_VERSION = 1;
	private readonly POUCH_LIMIT_STORE = 'pouchLimit';
	private readonly POUCH_USAGE_STORE = 'pouchUsage';

    override fetchPouchLimitForDay(day: Date): Observable<number> {
		const dayString = day.toISOString().split('T')[0];

        return this.selectDb()
			.pipe(
				switchMap(db => new Observable<number>(observer => {
					const transaction = db.transaction(this.POUCH_LIMIT_STORE, 'readonly');
					const store = transaction.objectStore(this.POUCH_LIMIT_STORE);
					const request = store.get(dayString) as IDBRequest<PouchLimitPerDayDao>;
					request.onsuccess = () => {
						observer.next(request.result?.limit);
						observer.complete();
					};
					request.onerror = () => {
						observer.error(request.error);
						observer.complete();
					};
				}))
			);
    }
    override setPouchLimitForDay(day: Date, limit: number): Observable<void> {
		const dayString = day.toISOString().split('T')[0];

		return this.selectDb()
			.pipe(
				switchMap(db => new Observable<void>(observer => {
					const transaction = db.transaction(this.POUCH_LIMIT_STORE, 'readwrite');
					const store = transaction.objectStore(this.POUCH_LIMIT_STORE);
					const request = store.put({day: dayString, limit: limit});
					request.onsuccess = () => {
						observer.next();
						observer.complete();
					};
					request.onerror = () => {
						observer.error(request.error);
						observer.complete();
					};
				}))
			);
    }

    override fetchPouchUsageForDay(day: Date): Observable<Array<PouchUsage>> {
		const dayString = day.toISOString().split('T')[0];

		return this.selectDb()
			.pipe(
				switchMap(db => new Observable<Array<PouchUsage>>(observer => {
					const transaction = db.transaction(this.POUCH_LIMIT_STORE, 'readonly');
					const store = transaction.objectStore(this.POUCH_LIMIT_STORE);
					const request = store.getAll() as IDBRequest<Array<PouchLimitPerDayDao>>;
					request.onsuccess = () => {
						observer.next(
							this.daoToPoachUsageArray(request.result.filter(dao => dao.day.startsWith(dayString)))
						);
						observer.complete();
					};
					request.onerror = () => {
						observer.error(request.error);
						observer.complete();
					};
				}))
			);
    }
    override addPouchUsageForDay(usage: PouchUsage): Observable<void> {
		return this.selectDb()
			.pipe(
				switchMap(db => new Observable<void>(observer => {
					const transaction = db.transaction(this.POUCH_LIMIT_STORE, 'readwrite');
					const store = transaction.objectStore(this.POUCH_LIMIT_STORE);
					const request = store.put(this.pouchUsageToDao(usage));
					request.onsuccess = () => {
						observer.next();
						observer.complete();
					};
					request.onerror = () => {
						observer.error(request.error);
						observer.complete();
					};
				}))
			);
    }

	private selectDb(): Observable<IDBDatabase> {
		return new Observable<IDBDatabase>(observer => {
			const request = indexedDB.open(this.DATABASE_NAME, this.DATABASE_VERSION);
			request.onsuccess = () => {
				observer.next(request.result);
				observer.complete();
			};
			request.onerror = () => {
				observer.error(request.error);
				observer.complete();
			};
			request.onupgradeneeded = (event) => {
				const db = request.result;

				const pouchLimitKeyPath: keyof PouchLimitPerDayDao = 'day';
				const pouchLimitStore = db.createObjectStore(this.POUCH_LIMIT_STORE, {keyPath: pouchLimitKeyPath});
				pouchLimitStore.createIndex(pouchLimitKeyPath, pouchLimitKeyPath, {unique: true});

				const pouchUsageKeyPath: keyof PouchUsageDao = 'dateTime';
				const pouchUsageStore = db.createObjectStore(this.POUCH_USAGE_STORE, {keyPath: pouchUsageKeyPath});
				pouchUsageStore.createIndex(pouchUsageKeyPath, pouchUsageKeyPath, {unique: true});
			}
		});
	}

	private daoToPoachUsageArray(dao: Array<PouchLimitPerDayDao>): Array<PouchUsage> {
		return dao.map(d => ({ dateTime: new Date(d.day) }));
	}

	private pouchUsageToDao(usage: PouchUsage): PouchUsageDao {
		return { dateTime: usage.dateTime.toISOString() };
	}
}