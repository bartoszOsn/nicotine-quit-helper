import { Component, inject, OnInit } from '@angular/core';
import { HomeDaySelectorComponent } from './day-selector/HomeDaySelectorComponent';
import { Store } from '../../api/Store';
import { AsyncPipe } from '@angular/common';
import { DayTimeState } from '../../api/model/DayTimeState';
import { PastViewComponent } from './views/past-view/PastViewComponent';
import { PresentViewComponent } from './views/present-view/PresentViewComponent';
import { FutureViewComponent } from './views/future-view/FutureViewComponent';
import { AppShellComponent } from '../common/app-shell/AppShellComponent';
import { AppHeaderComponent } from '../common/app-header/AppHeaderComponent';
import { NotificationTimerService } from './NotificationTimerService';

@Component({
	selector: 'home-root',
	templateUrl: 'HomeRootComponent.html',
	imports: [
		HomeDaySelectorComponent,
		AsyncPipe,
		PastViewComponent,
		PresentViewComponent,
		FutureViewComponent,
		AppShellComponent,
		AppHeaderComponent
	],
	providers: [NotificationTimerService]
})
export class HomeRootComponent implements OnInit {
	private readonly store = inject(Store);
	private readonly notificationTimerService = inject(NotificationTimerService);

	public readonly selectedDayTimeState$ = this.store.selectedDayTimeState$;

	protected DayTimeState = DayTimeState;

	ngOnInit(): void {
		this.notificationTimerService.init();
	}
}