import { Component } from '@angular/core';
import { HomeDaySelectorComponent } from './day-selector/HomeDaySelectorComponent';
import { HomeLimitInputComponent } from './limit-input/HomeLimitInput';

@Component({
	selector: 'home-root',
	templateUrl: 'HomeRootComponent.html',
	imports: [
		HomeDaySelectorComponent,
		HomeLimitInputComponent
	]
})
export class HomeRootComponent {
}