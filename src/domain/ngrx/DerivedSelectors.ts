import { createSelector } from '@ngrx/store';
import { SimpleSelectors } from './SimpleSelectors';

export class DerivedSelectors {
	static readonly selectSelectedDay = createSelector(
		SimpleSelectors.selectSelectedDay,
		(rawDay) => new Date(rawDay)
	);
}