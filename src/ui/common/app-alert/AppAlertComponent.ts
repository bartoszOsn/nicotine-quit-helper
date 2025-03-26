import { Component } from '@angular/core';
import { setHostClasses } from '../../../util/setHostClasses';

@Component({
	selector: 'app-alert',
	templateUrl: 'AppAlertComponent.html'
})
export class AppAlertComponent {
	constructor() {
		setHostClasses(
			'block px-4 py-2 flex gap-4',
			'bg-primary-100 border-primary-300'
		);
	}
}