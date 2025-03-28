export type CurrentPouchState = {
	type: 'no-pouch'
} | {
	type: 'pouch-used',
	timeLeftInSeconds: number
} | {
	type: 'pouch-ready'
}