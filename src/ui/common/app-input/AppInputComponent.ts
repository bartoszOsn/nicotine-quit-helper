import { Component } from '@angular/core';
import { setHostClasses } from '../../../util/setHostClasses';

@Component({
	selector: 'input[app-input]',
	templateUrl: 'AppInputComponent.html'
})
export class AppInputComponent {
	constructor() {
		setHostClasses(
			'bg-gray-200 px-3 py-2 rounded-none transition-colors border-b-3 border-transparent',
			'hover:bg-gray-300',
			'focus:bg-gray-300 focus:outline-none focus:border-primary-500'
		)
	}
}