import { Component, inject } from '@angular/core';
import { Repository } from '../../../api/Repository';
import { AppTimelineComponent } from '../../common/app-timeline/AppTimelineComponent';
import { AppTimelineItemComponent } from '../../common/app-timeline/AppTimelineItemComponent';
import { AppTimelineSectionHeaderComponent } from '../../common/app-timeline/AppTimelineSectionHeaderComponent';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
	selector: 'pouch-stats',
	imports: [
		AppTimelineComponent,
		AppTimelineItemComponent,
		AppTimelineSectionHeaderComponent,
		AsyncPipe,
		DatePipe
	],
	templateUrl: 'PouchStatsComponent.html'
})
export class PouchStatsComponent {
	private readonly repository = inject(Repository);

	readonly pouchesUsage$ = this.repository.pouchesUsage$;
	readonly pouchesLeft$ = this.repository.pouchesLeft$;
	readonly suggestedPouchUsage$ = this.repository.suggestedPouchUsage$;
	readonly limit$ = this.repository.pouchLimitForSelectedDay$;
	readonly showSuggestedPouchUsage$ = this.repository.showSuggestedPouchUsage$;
	protected readonly Infinity = Infinity;
}