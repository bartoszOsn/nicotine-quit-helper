import { Component, computed, input, Input } from '@angular/core';
import { setHostClasses } from '../../../util/setHostClasses';

@Component({
	selector: 'app-radial-progress',
	templateUrl: 'AppRadialProgressComponent.html'
})
export class AppRadialProgressComponent {
	readonly progress = input<number>(0);

	readonly RADIUS = 8;
	readonly CIRCUMFERENCE = 2 * Math.PI * this.RADIUS;
	readonly DASHOFFSET = this.CIRCUMFERENCE / 4;

	readonly dasharray = computed(() => {
		const filledArc = this.CIRCUMFERENCE * this.progress();
		const emptyArc = this.CIRCUMFERENCE - filledArc;
		return `${filledArc} ${emptyArc}`;
	})

	constructor() {
		setHostClasses('relative w-20 h-20');
	}
}