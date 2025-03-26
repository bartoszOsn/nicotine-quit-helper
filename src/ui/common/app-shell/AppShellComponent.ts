import { Component } from '@angular/core';
import { setHostClasses } from '../../../util/setHostClasses';

@Component({
	selector: 'app-shell',
	templateUrl: 'AppShellComponent.html'
})
export class AppShellComponent {
	constructor() {
		setHostClasses('flex flex-col w-full h-screen overflow-hidden');
	}
}