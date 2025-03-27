import { DestroyRef, inject, Injectable } from '@angular/core';
import { Store } from '../../api/Store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrentPouchState } from '../../api/model/CurrentPouchState';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { switchMap, takeWhile } from 'rxjs';

@Injectable()
export class NotificationTimerService {
	private readonly PROGRESS_NOTIFICATION_ID = 'pouch-progress';
	private readonly FINISHED_NOTIFICATION_ID = 'pouch-finished';

	private readonly store = inject(Store);
	private readonly destroyRef = inject(DestroyRef);

	private progressNotification: Notification | null = null;
	private finishedNotification: Notification | null = null;

	init(): void {
		fromPromise(Notification.requestPermission())
			.pipe(
				takeWhile(permission => permission === 'granted', false),
				switchMap(() => this.store.currentPouchState$),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((pouchState: CurrentPouchState) => {
				this.handlePouchState(pouchState);
			})
	}

	private handlePouchState(pouchState: CurrentPouchState): void {
		if (pouchState.type === 'pouch-used') {
			this.showOrUpdateProgressNotification(pouchState.timeLeftInSeconds);
		} else if (pouchState.type === 'pouch-ready') {
			this.showPouchReadyNotification();
		} else {
			this.hideNotification();
		}
	}

	private showOrUpdateProgressNotification(timeLeftInSeconds: number): void {
		this.hideNotification();
		this.progressNotification = new Notification(" Pouch in use", {
			tag: this.PROGRESS_NOTIFICATION_ID,
			body: `Time left: ${timeLeftInSeconds} seconds`,
			silent: true,
		});
		console.log(Notification.permission);
	}

	private showPouchReadyNotification(): void {
		this.hideNotification();
		this.finishedNotification = new Notification("Pouch ready", {
			tag: this.FINISHED_NOTIFICATION_ID,
			body: 'You can discard the pouch now',
			silent: false,
		});
	}

	private hideNotification(): void {
		if (this.progressNotification) {
			this.progressNotification.close();
			this.progressNotification = null;
		}
		if (this.finishedNotification) {
			this.finishedNotification.close();
			this.finishedNotification = null;
		}
	}
}