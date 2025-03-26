import { Component, inject } from '@angular/core';
import { HomeDaySelectorComponent } from './day-selector/HomeDaySelectorComponent';
import { Store } from '../../api/Store';
import { AsyncPipe } from '@angular/common';
import { DayTimeState } from '../../api/model/DayTimeState';
import { PastViewComponent } from './views/past-view/PastViewComponent';
import { PresentViewComponent } from './views/present-view/PresentViewComponent';
import { FutureViewComponent } from './views/future-view/FutureViewComponent';
import { AppShellComponent } from '../common/app-shell/AppShellComponent';

@Component({
	selector: 'home-root',
	templateUrl: 'HomeRootComponent.html',
	imports: [
		HomeDaySelectorComponent,
		AsyncPipe,
		PastViewComponent,
		PresentViewComponent,
		FutureViewComponent,
		AppShellComponent
	]
})
export class HomeRootComponent {
	private readonly store = inject(Store);

	public readonly selectedDayTimeState$ = this.store.selectedDayTimeState$;

	protected DayTimeState = DayTimeState;
}