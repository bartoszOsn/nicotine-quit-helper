import { Component } from '@angular/core';
import { setHostClasses } from '../../../util/setHostClasses';

@Component({
	selector: 'app-header',
	templateUrl: 'AppHeaderComponent.html'
})
export class AppHeaderComponent {
	constructor() {
		setHostClasses('flex flex-row w-full bg-primary-700 text-white px-4 py-2');
	}
}