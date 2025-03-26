import { Component } from '@angular/core';
import { UsedPouchesComponent } from '../../used-pouches/UsedPouchesComponent';
import { HomeLimitInputComponent } from '../../limit-input/HomeLimitInput';

@Component({
	selector: 'past-view',
	imports: [
		UsedPouchesComponent,
		HomeLimitInputComponent
	],
	templateUrl: 'PastViewComponent.html'
})
export class PastViewComponent {

}