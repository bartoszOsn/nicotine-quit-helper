import { DestroyRef, inject, Injectable } from '@angular/core';
import { Store } from '../../api/Store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrentPouchState } from '../../api/model/CurrentPouchState';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { map, Observable, of, switchMap, takeWhile, tap } from 'rxjs';

// TODO: To remove.
/** @deprecated */
@Injectable()
export class NotificationTimerService {
	private readonly PROGRESS_NOTIFICATION_ID = 'pouch-progress';
	private readonly FINISHED_NOTIFICATION_ID = 'pouch-finished';

	private readonly store = inject(Store);
	private readonly destroyRef = inject(DestroyRef);

	init(): void {
		fromPromise(Notification.requestPermission())
			.pipe(
				takeWhile(permission => permission === 'granted', false),
				switchMap(() => this.registerWebService()),
				switchMap(() => this.store.currentPouchState$),
				switchMap((pouchState) => this.handlePouchState(pouchState)),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe()
	}

	private handlePouchState(pouchState: CurrentPouchState): Observable<void> {
		if (pouchState.type === 'pouch-used') {
			return this.showOrUpdateProgressNotification(pouchState.timeLeftInSeconds);
		} else if (pouchState.type === 'pouch-ready') {
			return this.showPouchReadyNotification();
		} else {
			return this.hideNotification();
		}
	}

	private showOrUpdateProgressNotification(timeLeftInSeconds: number): Observable<void> {
		return this.hideNotification(this.FINISHED_NOTIFICATION_ID)
			.pipe(
				switchMap(() => navigator.serviceWorker.ready),
				switchMap((serviceWorker) => serviceWorker.showNotification("Pouch in use", {
					tag: this.PROGRESS_NOTIFICATION_ID,
					body: `Time left: ${timeLeftInSeconds} seconds`,
					silent: true,
				}))
			);
	}

	private showPouchReadyNotification(): Observable<void> {
		return this.hideNotification(this.PROGRESS_NOTIFICATION_ID)
			.pipe(
				switchMap(() => navigator.serviceWorker.ready),
				switchMap((serviceWorker) => serviceWorker.showNotification("Pouch ready", {
					tag: this.FINISHED_NOTIFICATION_ID,
					body: 'You can discard the pouch now',
					silent: false,
				}))
			);
	}

	private hideNotification(tag?: string): Observable<void> {
		fromPromise(navigator.serviceWorker.ready)
			.pipe(
				switchMap((serviceWorker) => {
					return serviceWorker.getNotifications(
						tag ? {tag} : undefined,
					);
				}),
				tap((notifications) => {
					notifications.forEach((notification) => notification.close());
				}),
				map(() => void 0),
			)

		return of(void 0);
	}

	private registerWebService(): Observable<void> {
		return fromPromise(navigator.serviceWorker.register('/web-service.js'))
			.pipe(
				map(() => void 0)
			);
	}
}