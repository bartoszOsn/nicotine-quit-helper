import { inject, InjectionToken } from '@angular/core';
import { INITIAL_STATE_TOKEN } from './INITIAL_STATE_TOKEN';
import { createReducer, on } from '@ngrx/store';
import {
	fetchLastPouchUsageSuccessAction,
	fetchLimitForSelectedDaySuccessAction,
	fetchPouchUsagesForSelectedDaySuccessAction,
	nextDayAction,
	previousDayAction,
	setLimitForSelectedDayAction
} from './actions';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export const REDUCER_TOKEN = new InjectionToken(
	'REDUCER_TOKEN',
	{ factory: reducerFactory }
);

function reducerFactory() {
	const initialState = inject(INITIAL_STATE_TOKEN);

	const rootReducer = createReducer(
		initialState,
		on(nextDayAction, (state) => ({
			...state,
			selectedDay: new Date(state.selectedDay.getTime() + DAY_IN_MILLISECONDS)
		})),

		on(previousDayAction, (state) => ({
			...state,
			selectedDay: new Date(state.selectedDay.getTime() - DAY_IN_MILLISECONDS)
		})),

		on(fetchLimitForSelectedDaySuccessAction, (state, action) => ({
			...state,
			pouchLimitForSelectedDay: action.limit,
		})),

		on(setLimitForSelectedDayAction, (state, action) => ({
			...state,
			pouchLimitForSelectedDay: action.limit,
		})),

		on(fetchPouchUsagesForSelectedDaySuccessAction, (state, action) => ({
			...state,
			pouchesUsage: action.usages
		})),

		on(fetchLastPouchUsageSuccessAction, (state, action) => ({
			...state,
			lastPouchUsage: action.usage
		}))
	);

	return { ROOT: rootReducer }
}