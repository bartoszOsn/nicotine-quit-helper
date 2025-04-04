import { InjectionToken } from '@angular/core';
import { RootState } from './AppState';

export const INITIAL_STATE_TOKEN = new InjectionToken<RootState>(
	'INITIAL_STATE_TOKEN',
	{ factory: initialStateFactory }
);

function initialStateFactory(): RootState {

	return {
		selectedDay: new Date(),
		pouchLimitForSelectedDay: null,
		pouchesUsage: [],
		lastPouchUsage: null
	};
}