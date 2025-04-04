import { createAction, props } from '@ngrx/store';
import { PouchUsage } from '../../api/model/PouchUsage';

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

export const fetchPouchUsagesForSelectedDayAction = createAction(`${PREFIX} Fetch Pouch Usage For Selected Day`);
export const fetchPouchUsagesForSelectedDaySuccessAction = createAction(
	`${PREFIX} Fetch Pouch Usage For Selected Day Success`,
	props<{ usages: Array<PouchUsage> }>()
);
export const addPouchUsageAction = createAction(
	`${PREFIX} Add Pouch Usage`,
	props<{ usage: PouchUsage }>()
);

export const fetchLastPouchUsageSuccessAction = createAction(
	`${PREFIX} Fetch Last Pouch Usage Success`,
	props<{ usage: PouchUsage | null }>()
);