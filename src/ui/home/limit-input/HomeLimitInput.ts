import { Component, inject } from '@angular/core';
import { defer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '../../../api/Store';
import { AppInputComponent } from '../../common/app-input/AppInputComponent';
import { setHostClasses } from '../../../util/setHostClasses';

@Component({
	selector: 'home-limit-input',
	imports: [
		AsyncPipe,
		AppInputComponent
	],
	templateUrl: 'HomeLimitInputComponent.html'
})
export class HomeLimitInputComponent {
	readonly limit$ = defer(() => this.store.pouchLimitForSelectedDay$);
	readonly canEdit$ = defer(() => this.store.canEditLimitOnSelectedDay$);

	private readonly store = inject(Store);

	constructor() {
		setHostClasses('block mb-6');
	}

	setLimit(event: Event): void {
		this.store.setLimitForSelectedDay((event.currentTarget as HTMLInputElement).valueAsNumber).subscribe();
	}
}