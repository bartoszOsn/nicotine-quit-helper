import { Component, inject } from '@angular/core';
import { Store } from '../../../api/Store';
import { defer } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AppButtonComponent } from '../../common/app-button/AppButtonComponent';

@Component({
	selector: 'home-day-selector',
	imports: [
		AsyncPipe,
		DatePipe,
		AppButtonComponent
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