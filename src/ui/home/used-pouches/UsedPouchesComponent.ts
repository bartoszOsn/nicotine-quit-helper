import { Component, inject } from '@angular/core';
import { Store } from '../../../api/Store';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
	selector: 'used-pouches',
	imports: [
		AsyncPipe,
		DatePipe
	],
	templateUrl: 'UsedPouchesComponent.html'
})
export class UsedPouchesComponent {
	private readonly store = inject(Store);

	readonly pouchesUsage$ = this.store.pouchesUsage$;
	readonly overLimit$ = this.store.overLimit$;
}