export type CurrentPouchState = {
	type: 'no-pouch'
} | {
	type: 'pouch-used',
	timeLeftInSeconds: number,
	progress: number,
} | {
	type: 'pouch-ready'
}