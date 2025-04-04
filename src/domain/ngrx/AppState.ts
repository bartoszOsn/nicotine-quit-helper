import { StringifiedDate } from '../model/StringifiedDate';
import { PouchUsage } from '../../api/model/PouchUsage';

export interface AppState {
	ROOT: RootState;
}

export interface RootState {
	selectedDay: StringifiedDate;
	pouchLimitForSelectedDay: number | null;
	pouchesUsage: Array<PouchUsage>;
	lastPouchUsage: PouchUsage | null;
}