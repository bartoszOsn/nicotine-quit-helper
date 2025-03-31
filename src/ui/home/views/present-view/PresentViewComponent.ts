import { Component, inject } from '@angular/core';
import { HomeLimitInputComponent } from '../../limit-input/HomeLimitInput';
import { Repository } from '../../../../api/Repository';
import { CurrentPouchComponent } from '../../current-pouch/CurrentPouchComponent';
import { AppButtonComponent } from '../../../common/app-button/AppButtonComponent';
import { PouchStatsComponent } from '../../pouch-stats/PouchStatsComponent';

@Component({
	selector: 'present-view',
	imports: [
		HomeLimitInputComponent,
		CurrentPouchComponent,
		AppButtonComponent,
		PouchStatsComponent
	],
	templateUrl: 'PresentViewComponent.html'
})
export class PresentViewComponent {
	private readonly repository = inject(Repository);

	usePouch(): void {
		this.repository.usePouch().subscribe();
	}
}