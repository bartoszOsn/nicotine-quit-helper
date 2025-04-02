import { Component, inject } from '@angular/core';
import { Repository } from '../../../api/Repository';
import { defer } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AppButtonComponent } from '../../common/app-button/AppButtonComponent';
import { setHostClasses } from '../../../util/setHostClasses';

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

	private readonly store = inject(Repository);

	constructor() {
		setHostClasses('w-full flex justify-between items-center');
	}

	previousDay(): void {
		this.store.previousDay().subscribe();
	}

	nextDay(): void {
		this.store.nextDay().subscribe();
	}
}