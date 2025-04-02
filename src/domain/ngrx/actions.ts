import { createAction } from '@ngrx/store';

const PREFIX = '[ROOT]';

export const nextDayAction = createAction(`${PREFIX} Next Day`);
export const previousDayAction = createAction(`${PREFIX} Previous Day`);