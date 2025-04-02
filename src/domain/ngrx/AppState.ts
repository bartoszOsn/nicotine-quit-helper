import { StringifiedDate } from '../model/StringifiedDate';

export interface AppState {
	ROOT: RootState;
}

export interface RootState {
	selectedDay: StringifiedDate
}