import { inject, InjectionToken } from '@angular/core';
import { RootState } from './AppState';
import { DomainConverter } from '../DomainConverter';

export const INITIAL_STATE_TOKEN = new InjectionToken<RootState>(
	'INITIAL_STATE_TOKEN',
	{ factory: initialStateFactory }
);

function initialStateFactory(): RootState {
	const domainConverter = inject(DomainConverter);

	return {
		selectedDay: domainConverter.dateToStringified(new Date()),
		pouchLimitForSelectedDay: null,
		pouchesUsage: [],
		lastPouchUsage: null
	};
}