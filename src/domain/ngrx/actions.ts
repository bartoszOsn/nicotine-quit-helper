import { createAction, props } from '@ngrx/store';

export const fetchLimitForSelectedDay = createAction(
	'[Home] Fetch Limit For Selected Day'
);
export const fetchLimitForSelectedDaySuccess = createAction(
	'[Home] Fetch Limit For Selected Day Success',
	props<{ limit: number | null }>()
);
