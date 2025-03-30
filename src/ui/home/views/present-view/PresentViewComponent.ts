import { Component, inject } from '@angular/core';
import { HomeLimitInputComponent } from '../../limit-input/HomeLimitInput';
import { UsedPouchesComponent } from '../../used-pouches/UsedPouchesComponent';
import { Store } from '../../../../api/Store';
import { CurrentPouchComponent } from '../../current-pouch/CurrentPouchComponent';
import { RemainingPouchesComponent } from '../../remaining-pouches/RemainingPouchesComponent';
import { AppButtonComponent } from '../../../common/app-button/AppButtonComponent';
import { AppTimelineComponent } from '../../../common/app-timeline/AppTimelineComponent';
import { AppTimelineSectionHeaderComponent } from '../../../common/app-timeline/AppTimelineSectionHeaderComponent';
import { AppTimelineItemComponent } from '../../../common/app-timeline/AppTimelineItemComponent';

@Component({
	selector: 'present-view',
	imports: [
		HomeLimitInputComponent,
		UsedPouchesComponent,
		CurrentPouchComponent,
		RemainingPouchesComponent,
		AppButtonComponent,
		AppTimelineComponent,
		AppTimelineSectionHeaderComponent,
		AppTimelineItemComponent
	],
	templateUrl: 'PresentViewComponent.html'
})
export class PresentViewComponent {
	private readonly store = inject(Store);

	usePouch(): void {
		this.store.usePouch().subscribe();
	}
}