import { Component, inject } from '@angular/core';
import { Store } from '../../../api/Store';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'current-pouch',
	imports: [
		AsyncPipe
	],
	templateUrl: 'CurrentPouchComponent.html'
})
export class CurrentPouchComponent {
	private readonly store = inject(Store);

	readonly currentPouchState$ = this.store.currentPouchState$;
}