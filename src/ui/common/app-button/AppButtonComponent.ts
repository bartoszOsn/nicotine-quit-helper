import { Component } from '@angular/core';
import { setHostClasses } from '../../../util/setHostClasses';

@Component({
	selector: 'button[app-btn]',
	templateUrl: 'AppButtonComponent.html'
})
export class AppButtonComponent {
	constructor() {
		setHostClasses(
			'bg-primary-900 text-gray-100 transition-colors',
			'hover:bg-primary-950',
			'active:bg-gray-950',
			'px-4 py-2 cursor-pointer'
		);
	}
}