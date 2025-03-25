import { Component, inject } from '@angular/core';
import { Store } from '../../../api/Store';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
	selector: 'remaining-pouches-component',
	imports: [
		AsyncPipe,
		DatePipe
	],
	templateUrl: 'RemainingPouchesComponent.html'
})
export class RemainingPouchesComponent {
	private readonly store = inject(Store);

	readonly pouchesLeft$ = this.store.pouchesLeft$;
	readonly suggestedPouchUsage$ = this.store.suggestedPouchUsage$;
}