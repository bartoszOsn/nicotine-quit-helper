export type CurrentPouchState = {
	type: 'no-pouch'
} | {
	type: 'pouch-used',
	startTime: Date
}