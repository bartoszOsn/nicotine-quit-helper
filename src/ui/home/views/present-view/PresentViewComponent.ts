import { Component, inject } from '@angular/core';
import { HomeLimitInputComponent } from '../../limit-input/HomeLimitInput';
import { UsedPouchesComponent } from '../../used-pouches/UsedPouchesComponent';
import { Store } from '../../../../api/Store';
import { CurrentPouchComponent } from '../../current-pouch/CurrentPouchComponent';
import { RemainingPouchesComponent } from '../../remaining-pouches/RemainingPouchesComponent';

@Component({
	selector: 'present-view',
	imports: [
		HomeLimitInputComponent,
		UsedPouchesComponent,
		CurrentPouchComponent,
		RemainingPouchesComponent
	],
	templateUrl: 'PresentViewComponent.html'
})
export class PresentViewComponent {
	private readonly store = inject(Store);

	usePouch(): void {
		this.store.usePouch().subscribe();
	}
}