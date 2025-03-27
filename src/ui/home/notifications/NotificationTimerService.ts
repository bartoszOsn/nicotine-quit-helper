import { DestroyRef, inject, Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { map, Observable, of, pairwise, switchMap, takeWhile, tap } from 'rxjs';
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
				switchMap(() => this.registerWorker()),
				switchMap(() => this.store.currentPouchState$.pipe(pairwise())),
				switchMap(([prevState, nextState]) => this.handlePouchState(prevState, nextState)),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe()
	}

	private registerWorker(): Observable<void> {
		return fromPromise(
			navigator.serviceWorker.register(new URL('./notifications-service-worker.js', import.meta.url))
		).pipe(
			tap(() => {
				navigator.serviceWorker.onmessage = (event) => {
					if ('title' in event.data) {
						const notification = event.data;
						navigator.serviceWorker.ready.then((registration) => {
							registration.showNotification(notification.title, {
								body: notification.body,
								tag: notification.tag,
								silent: notification.silent
							}).then();
						});
					}
				};
			}),
			map(() => void 0)
		);
	}

	private handlePouchState(prevState: CurrentPouchState, nextState: CurrentPouchState): Observable<void> {
		if (prevState.type !== 'pouch-used' && nextState.type === 'pouch-used') {
			const date = Date.now();
			const getNotification = (scheduledFromNow: number): NotificationPayload => ({
				title: 'Pouch in use',
				body: `Time left: ${nextState.timeLeftInSeconds - Math.floor(scheduledFromNow / 1000)} seconds`,
				silent: false,
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

			return fromPromise(navigator.serviceWorker.ready).pipe(
				tap((registration) => registration.active?.postMessage(message)),
				map(() => void 0)
			);
		}

		return of(void 0);
	}
}
