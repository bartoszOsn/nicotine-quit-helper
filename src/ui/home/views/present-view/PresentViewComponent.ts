import { Component, inject } from '@angular/core';
import { HomeLimitInputComponent } from '../../limit-input/HomeLimitInput';
import { UsedPouchesComponent } from '../../used-pouches/UsedPouchesComponent';
import { Store } from '../../../../api/Store';

@Component({
	selector: 'present-view',
	imports: [
		HomeLimitInputComponent,
		UsedPouchesComponent
	],
	templateUrl: 'PresentViewComponent.html'
})
export class PresentViewComponent {
	private readonly store = inject(Store);

	usePouch(): void {
		this.store.usePouch().subscribe();
	}
}