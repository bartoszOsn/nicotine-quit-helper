import { AppState } from './AppState';
import { createSelector } from '@ngrx/store';

export const selectRoot = (state: AppState) => state.ROOT;

export const selectSelectedDay = createSelector(
	selectRoot,
	(state) => state.selectedDay
);

export const selectPouchLimitForSelectedDay = createSelector(
	selectRoot,
	(state) => state.pouchLimitForSelectedDay
);

export const selectPouchUsage = createSelector(
	selectRoot,
	(state) => state.pouchesUsage
);