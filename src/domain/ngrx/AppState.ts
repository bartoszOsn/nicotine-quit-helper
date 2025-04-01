import { Day } from '../../util/time/model/Day';

export interface RootState {
	readonly selectedDay: Day;
	readonly pouchLimitForSelectedDay: number | null;
}

export interface AppState {
	ROOT: RootState;
}