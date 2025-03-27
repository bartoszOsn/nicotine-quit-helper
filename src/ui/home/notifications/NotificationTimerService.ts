import { DestroyRef, inject, Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { map, Observable, of, pairwise, switchMap, takeWhile, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '../../../api/Store';
import { CurrentPouchState } from '../../../api/model/CurrentPouchState';
import { NotificationMessage, NotificationPayload } from './NotificationMessage';

// TODO: Zrefaktorować to jakoś, bo to jest straszne
@Injectable()
export class NotificationTimerService {
	private readonly store = inject(Store);
	private readonly destroyRef = inject(DestroyRef);

	init(): void {
		fromPromise(Notification.requestPermission())
			.pipe(
				takeWhile(permission => permission === 'granted', false),
				switchMap(() => this.registerWorker()),
				switchMap(() => this.store.currentPouchState$),
				switchMap((state) => this.handlePouchState(state)),
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

	private handlePouchState(state: CurrentPouchState): Observable<void> {
		if (state.type === 'pouch-used') {
			const date = Date.now();
			const getNotification = (scheduledFromNow: number): NotificationPayload => ({
				title: 'Pouch in use',
				body: `Time left: ${Math.floor((30 * 60 * 1000 - scheduledFromNow)/1000 )} seconds`,
				silent: false,
				tag: 'pouch-progress',
				scheduledAt: date + scheduledFromNow,
			});

			const message: NotificationMessage = {
				type: 'notification',
				notifications: [
					...Array.from({length: 30 * 60}, (_, i) => getNotification(i * 1000)),
					{
						title: 'Pouch used up',
						body: 'You can dispose of the pouch now',
						tag: 'pouch-used-up',
						scheduledAt: date + 30 * 60 * 1000,
						silent: false
					}
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
