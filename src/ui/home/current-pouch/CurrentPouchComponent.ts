import { Component, inject } from '@angular/core';
import { Store } from '../../../api/Store';
import { AsyncPipe } from '@angular/common';
import { AppAlertComponent } from '../../common/app-alert/AppAlertComponent';
import { map, Observable, of, switchMap, timer } from 'rxjs';

@Component({
	selector: 'current-pouch',
	imports: [
		AsyncPipe,
		AppAlertComponent
	],
	templateUrl: 'CurrentPouchComponent.html'
})
export class CurrentPouchComponent {
	private readonly POUCH_USAGE_TIME = 30 * 60 * 1000;

	private readonly store = inject(Store);

	readonly currentPouchState$ = this.store.currentPouchState$;
	readonly pouchTimeLeft$: Observable<number> = this.currentPouchState$.pipe(
		switchMap(currentPouchState => {
			if (currentPouchState.type === 'no-pouch') {
				return of(0);
			}

			return timer(0, 1000).pipe(
				map(() => {
					const timePassed = Date.now() - currentPouchState.startTime.getTime();
					const timeLeft = this.POUCH_USAGE_TIME - timePassed;
					return Math.max(0, timeLeft);
				}),
				map(timeLeft => Math.floor(timeLeft / 1000))
			)
		})
	);
}