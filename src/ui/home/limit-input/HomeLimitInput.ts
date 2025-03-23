import { Component, inject } from '@angular/core';
import { defer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '../../../api/Store';

@Component({
	selector: 'home-limit-input',
	imports: [
		AsyncPipe
	],
	templateUrl: 'HomeLimitInputComponent.html'
})
export class HomeLimitInputComponent {
	readonly limit$ = defer(() => this.store.pouchLimitForSelectedDay$);

	private readonly store = inject(Store);

	setLimit(event: Event): void {
		this.store.setLimitForSelectedDay((event.currentTarget as HTMLInputElement).valueAsNumber).subscribe();
	}
}