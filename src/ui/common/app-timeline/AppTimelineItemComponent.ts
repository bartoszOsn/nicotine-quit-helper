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
		return this.variant() === 'primary' ? 'bg-primary-500' : 'bg-blue-500';
	});

	readonly lineColorClass = computed(() => {
		return this.variant() === 'primary' ? 'bg-primary-200' : 'bg-blue-200';
	});

	constructor() {
		setHostClasses('flex flex-row');
	}
}