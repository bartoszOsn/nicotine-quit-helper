import { createReducer, on } from '@ngrx/store';
import { RootState } from './AppState';
import { fetchLimitForSelectedDaySuccess } from './actions';

const initialState: RootState = {
	selectedDay: new Date().toISOString(),
	pouchLimitForSelectedDay: null
};

export const reducer = createReducer(
	initialState,
	on(fetchLimitForSelectedDaySuccess, (state, { limit }) => ({
		...state,
		pouchLimitForSelectedDay: limit
	}))
)