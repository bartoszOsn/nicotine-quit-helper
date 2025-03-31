import { Component, inject } from '@angular/core';
import { defer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Repository } from '../../../api/Repository';
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
	readonly limit$ = defer(() => this.repository.pouchLimitForSelectedDay$);
	readonly canEdit$ = defer(() => this.repository.canEditLimitOnSelectedDay$);

	private readonly repository = inject(Repository);

	constructor() {
		setHostClasses('block mb-8');
	}

	setLimit(event: Event): void {
		this.repository.setLimitForSelectedDay((event.currentTarget as HTMLInputElement).valueAsNumber).subscribe();
	}
}