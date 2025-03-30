import { Component, computed, input } from '@angular/core';
import { setHostClasses } from '../../../util/setHostClasses';
import { ColorVariant } from '../ColorVariant';

@Component({
	selector: 'app-timeline-section-header',
	templateUrl: 'AppTimelineSectionHeaderComponent.html'
})
export class AppTimelineSectionHeaderComponent {
	readonly variant = input<ColorVariant>('primary');

	readonly headerColorClass = computed(() => {
		return this.variant() === 'primary' ? 'text-primary-800' : 'text-blue-800';
	});

	readonly lineColorClass = computed(() => {
		return this.variant() === 'primary' ? 'bg-primary-200' : 'bg-blue-200';
	});

	constructor() {
		setHostClasses('flex flex-row');
	}
}