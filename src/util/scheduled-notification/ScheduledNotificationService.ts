import { Injectable } from '@angular/core';
import { combineLatestWith, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { ScheduledNotificationOptions } from './model/ScheduledNotificationOptions';
import { ScheduledNotificationId } from './model/ScheduledNotificationId';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { ScheduledNotificationRegistrationMessage } from './messages/ScheduledNotificationRegistrationMessage';

@Injectable()
export class ScheduledNotificationService {
	private static nextId = 0;

	// TODO: Handle when PWA is not instaled and periodic sync is not supported: https://stackoverflow.com/a/67547205
	init(): void {
		this.selectRegistration()
			.pipe(
				switchMap((registration) => {
					try {
						return fromPromise((registration as any).periodicSync.register("get-latest-news", {
							minInterval: 1000 * 60,
						}));
					} catch {
						console.log("Periodic Sync could not be registered!");
						return of(void 0);
					}
				})
			)
			.subscribe();

		new Observable<ScheduledNotificationRegistrationMessage>((observer) => {
			const listener = (event: MessageEvent<ScheduledNotificationRegistrationMessage>) => {
				if (event.data.type === 'ScheduledNotificationRegistration') {
					observer.next(event.data);
				}
			};

			navigator.serviceWorker.addEventListener('message', listener);

			return () => {
				navigator.serviceWorker.removeEventListener('message', listener);
			};
		})
			.pipe(
				combineLatestWith(this.selectRegistration())
			)
			.subscribe(([message, registration]) => {
				registration.showNotification(message.notification.title, {
					body: message.notification.body
				});
			});
	}

	// TODO: Register periodic background sync
	scheduleNotification(options: ScheduledNotificationOptions): Observable<ScheduledNotificationId> {
		return this.selectRegistration()
			.pipe(
				map((registration) => {
					const notificationMessage = this.getNotificationMessage(options);
					registration.active?.postMessage(notificationMessage);
					return notificationMessage.notification.id;
				}),
			)
	}

	cancelNotification(id: ScheduledNotificationId): Observable<void> {
		return EMPTY; // TODO
	}

	private selectRegistration(): Observable<ServiceWorkerRegistration> {
		return fromPromise(navigator.serviceWorker.ready);
	}

	private getNotificationMessage(options: ScheduledNotificationOptions): ScheduledNotificationRegistrationMessage {
		return {
			type: 'ScheduledNotificationRegistration',
			notification: {
				...options,
				id: ScheduledNotificationService.nextId++ as ScheduledNotificationId,
			}
		};
	}
}