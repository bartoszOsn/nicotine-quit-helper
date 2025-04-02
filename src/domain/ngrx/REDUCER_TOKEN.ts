import { inject, InjectionToken } from '@angular/core';
import { INITIAL_STATE_TOKEN } from './INITIAL_STATE_TOKEN';
import { createReducer, on } from '@ngrx/store';
import { fetchLimitForSelectedDaySuccessAction, nextDayAction, previousDayAction, setLimitForSelectedDayAction } from './actions';
import { DomainConverter } from '../DomainConverter';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export const REDUCER_TOKEN = new InjectionToken(
	'REDUCER_TOKEN',
	{ factory: reducerFactory }
);

function reducerFactory() {
	const initialState = inject(INITIAL_STATE_TOKEN);
	const domainConverter = inject(DomainConverter);

	const rootReducer = createReducer(
		initialState,
		on(nextDayAction, (state) => ({
			...state,
			selectedDay: domainConverter.dateToStringified(
				new Date(domainConverter.stringifiedToDate(state.selectedDay).getTime() + DAY_IN_MILLISECONDS)
			),
		})),

		on(previousDayAction, (state) => ({
			...state,
			selectedDay: domainConverter.dateToStringified(
				new Date(domainConverter.stringifiedToDate(state.selectedDay).getTime() - DAY_IN_MILLISECONDS)
			),
		})),

		on(fetchLimitForSelectedDaySuccessAction, (state, action) => ({
			...state,
			pouchLimitForSelectedDay: action.limit,
		})),

		on(setLimitForSelectedDayAction, (state, action) => ({
			...state,
			pouchLimitForSelectedDay: action.limit,
		})),
	);

	return { ROOT: rootReducer }
}