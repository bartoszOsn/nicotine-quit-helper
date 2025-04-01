import { createReducer, on } from '@ngrx/store';
import { AppState, RootState } from './AppState';
import { fetchLimitForSelectedDaySuccess } from './actions';
import { inject, InjectionToken } from '@angular/core';
import { TimeService } from '../../util/time/TimeService';

function initialStateFactory(): RootState {
	const timeService = inject(TimeService);

	return {
		selectedDay: timeService.getToday(),
		pouchLimitForSelectedDay: null
	};
}

function reducerFactory() {
	const initialState = inject(INITIAL_STATE_TOKEN);

	const reducer = createReducer(
		initialState,
		on(fetchLimitForSelectedDaySuccess, (state, { limit }) => ({
			...state,
			pouchLimitForSelectedDay: limit
		}))
	);
	return {ROOT: reducer };
}

export const INITIAL_STATE_TOKEN = new InjectionToken('INITIAL_STATE_TOKEN', { factory: initialStateFactory });
export const REDUCER_TOKEN = new InjectionToken('REDUCER_TOKEN', { factory: reducerFactory });