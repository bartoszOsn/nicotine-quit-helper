import { Component } from '@angular/core';
import { setHostClasses } from '../../../util/setHostClasses';

@Component({
	selector: 'app-timeline',
	templateUrl: 'AppTimelineComponent.html'
})
export class AppTimelineComponent {
	constructor() {
		setHostClasses('flex flex-col');
	}
}