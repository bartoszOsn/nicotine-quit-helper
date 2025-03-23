import { Component } from '@angular/core';
import { HomeDaySelectorComponent } from './day-selector/HomeDaySelectorComponent';

@Component({
	selector: 'home-root',
	templateUrl: 'HomeRootComponent.html',
	imports: [
		HomeDaySelectorComponent
	]
})
export class HomeRootComponent {
}