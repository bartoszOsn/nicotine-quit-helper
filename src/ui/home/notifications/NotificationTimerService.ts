import { DestroyRef, inject, Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { combineLatestWith, map, Observable, pairwise, switchMap, takeWhile, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '../../../api/Store';
import { CurrentPouchState } from '../../../api/model/CurrentPouchState';
import { NotificationMessage, NotificationPayload } from './NotificationMessage';

@Injectable()
export class NotificationTimerService {
	private readonly store = inject(Store);
	private readonly destroyRef = inject(DestroyRef);

	init(): void {
		fromPromise(Notification.requestPermission())
			.pipe(
				takeWhile(permission => permission === 'granted', false),
				map(() => this.registerWorker()),
				combineLatestWith(this.store.currentPouchState$.pipe(pairwise())),
				tap(([worker, [prevState, nextState]]) => this.handlePouchState(worker, prevState, nextState)),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe()
	}

	private registerWorker(): Worker {
		return new Worker(new URL('./notifications-worker.ts', import.meta.url));
	}

	private handlePouchState(worker: Worker, prevState: CurrentPouchState, nextState: CurrentPouchState): void {
		if (prevState.type !== 'pouch-used' && nextState.type === 'pouch-used') {
			const date = Date.now();
			const getNotification = (scheduledFromNow: number): NotificationPayload => ({
				title: 'Pouch in use',
				body: `Time left: ${nextState.timeLeftInSeconds - Math.floor(scheduledFromNow / 1000)} seconds`,
				silent: true,
				tag: 'pouch-progress',
				scheduledAt: date + scheduledFromNow,
			})

			const message: NotificationMessage = {
				type: 'notification',
				notifications: [
					getNotification(0),
					getNotification(1000),
					getNotification(2000),
					getNotification(3000),
					getNotification(4000),
					getNotification(5000),
					getNotification(6000),
					getNotification(7000),
					getNotification(8000),
					getNotification(9000),
					getNotification(10000),
				]
			}

			worker.postMessage(message);
		}
	}
}