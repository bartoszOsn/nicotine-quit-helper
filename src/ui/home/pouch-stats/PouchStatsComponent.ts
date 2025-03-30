import { Component, inject } from '@angular/core';
import { Store } from '../../../api/Store';
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
	private readonly store = inject(Store);

	readonly pouchesUsage$ = this.store.pouchesUsage$;
	readonly pouchesLeft$ = this.store.pouchesLeft$;
	readonly suggestedPouchUsage$ = this.store.suggestedPouchUsage$;
	readonly limit$ = this.store.pouchLimitForSelectedDay$;
	protected readonly Infinity = Infinity;
}