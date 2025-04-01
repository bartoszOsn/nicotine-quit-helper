export interface RootState {
	readonly selectedDay: string;
	readonly pouchLimitForSelectedDay: number | null;
}

export interface AppState {
	ROOT: RootState;
}