import { Component } from '@angular/core';
import { HomeLimitInputComponent } from '../../limit-input/HomeLimitInput';
import { PouchStatsComponent } from '../../pouch-stats/PouchStatsComponent';

@Component({
	selector: 'past-view',
	imports: [
		HomeLimitInputComponent,
		PouchStatsComponent
	],
	templateUrl: 'PastViewComponent.html'
})
export class PastViewComponent {

}