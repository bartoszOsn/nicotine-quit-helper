import { Component, inject } from '@angular/core';
import { HomeLimitInputComponent } from '../../limit-input/HomeLimitInput';
import { UsedPouchesComponent } from '../../used-pouches/UsedPouchesComponent';
import { Store } from '../../../../api/Store';
import { CurrentPouchComponent } from '../../current-pouch/CurrentPouchComponent';
import { RemainingPouchesComponent } from '../../remaining-pouches/RemainingPouchesComponent';
import { AppButtonComponent } from '../../../common/app-button/AppButtonComponent';

@Component({
	selector: 'present-view',
	imports: [
		HomeLimitInputComponent,
		UsedPouchesComponent,
		CurrentPouchComponent,
		RemainingPouchesComponent,
		AppButtonComponent
	],
	templateUrl: 'PresentViewComponent.html'
})
export class PresentViewComponent {
	private readonly store = inject(Store);

	usePouch(): void {
		this.store.usePouch().subscribe();
	}
}