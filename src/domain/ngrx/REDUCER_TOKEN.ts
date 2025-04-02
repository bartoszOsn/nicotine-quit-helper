import { inject, InjectionToken } from '@angular/core';
import { INITIAL_STATE_TOKEN } from './INITIAL_STATE_TOKEN';
import { createReducer } from '@ngrx/store';

export const REDUCER_TOKEN = new InjectionToken(
	'REDUCER_TOKEN',
	{ factory: reducerFactory }
);

function reducerFactory() {
	const initialState = inject(INITIAL_STATE_TOKEN);

	const rootReducer = createReducer(
		initialState,
	);

	return { ROOT: rootReducer }
}