import { createSelector } from '@ngrx/store';
import { AppState } from './AppState';

export class SimpleSelectors {
	static readonly selectRoot = (state: AppState) => state.ROOT;
	static readonly selectSelectedDay = createSelector(
		SimpleSelectors.selectRoot,
		(state) => state.selectedDay
	);
	static readonly selectPouchLimitForSelectedDay = createSelector(
		SimpleSelectors.selectRoot,
		(state) => state.pouchLimitForSelectedDay
	);
}
