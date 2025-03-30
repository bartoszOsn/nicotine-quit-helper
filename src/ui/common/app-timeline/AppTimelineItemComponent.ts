import { Component, computed, input } from '@angular/core';
import { setHostClasses } from '../../../util/setHostClasses';
import { ColorVariant } from '../ColorVariant';

@Component({
	selector: 'app-timeline-item',
	templateUrl: 'AppTimelineItemComponent.html'
})
export class AppTimelineItemComponent {
	readonly variant = input<ColorVariant>('primary');

	readonly marbleColorClass = computed(() => {
		switch (this.variant()) {
			case 'primary':
				return 'bg-primary-500';
			case 'secondary':
				return 'bg-blue-500';
			case 'danger':
				return 'bg-red-700';
			default:
				return 'bg-gray-500';
		}
	});

	readonly lineColorClass = computed(() => {
		switch (this.variant()) {
			case 'primary':
				return 'bg-primary-200';
			case 'secondary':
				return 'bg-blue-200';
			case 'danger':
				return 'bg-red-300';
			default:
				return 'bg-gray-200';
		}
	});

	constructor() {
		setHostClasses('flex flex-row');
	}
}