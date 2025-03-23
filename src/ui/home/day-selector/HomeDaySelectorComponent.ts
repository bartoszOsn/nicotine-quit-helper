import { Component, inject } from '@angular/core';
import { Store } from '../../../api/Store';
import { defer } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
	selector: 'home-day-selector',
	imports: [
		AsyncPipe,
		DatePipe
	],
	templateUrl: 'HomeDaySelectorComponent.html'
})
export class HomeDaySelectorComponent {
	readonly selectedDay$ = defer(() => this.store.selectedDay$);

	private readonly store = inject(Store);

	previousDay(): void {
		this.store.previousDay().subscribe();
	}

	nextDay(): void {
		this.store.nextDay().subscribe();
	}
}