import { createAction, props } from '@ngrx/store';

const PREFIX = '[ROOT]';

export const nextDayAction = createAction(`${PREFIX} Next Day`);
export const previousDayAction = createAction(`${PREFIX} Previous Day`);

export const fetchLimitForSelectedDayAction = createAction(`${PREFIX} Fetch Limit For Selected Day`);
export const fetchLimitForSelectedDaySuccessAction = createAction(
	`${PREFIX} Fetch Limit For Selected Day Success`,
	props<{ limit: number | null }>()
);
export const setLimitForSelectedDayAction = createAction(
	`${PREFIX} Set Limit For Selected Day`,
	props<{ limit: number }>()
);