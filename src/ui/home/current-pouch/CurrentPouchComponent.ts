import { Component, inject } from '@angular/core';
import { Repository } from '../../../api/Repository';
import { AsyncPipe } from '@angular/common';
import { AppAlertComponent } from '../../common/app-alert/AppAlertComponent';
import { AppRadialProgressComponent } from '../../common/app-radial-Progress/AppRadialProgressComponent';
import { AppIntervalPipe } from '../../common/appInterval';

@Component({
	selector: 'current-pouch',
	imports: [
		AsyncPipe,
		AppAlertComponent,
		AppRadialProgressComponent,
		AppIntervalPipe
	],
	templateUrl: 'CurrentPouchComponent.html'
})
export class CurrentPouchComponent {
	private readonly repository = inject(Repository);

	readonly currentPouchState$ = this.repository.currentPouchState$;
}