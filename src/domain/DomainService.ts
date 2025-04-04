import { Injectable } from '@angular/core';
import { DayTimeState } from '../api/model/DayTimeState';
import { PouchUsage } from '../api/model/PouchUsage';
import { CurrentPouchState } from '../api/model/CurrentPouchState';

@Injectable()
export class DomainService {
	private readonly POUCH_USAGE_TIME = 30 * 60 * 1000;
	private readonly ALERT_TIME = 2 * 1000;

	canEditLimitOnSelectedDay(dayTimeState: DayTimeState): boolean {
		return dayTimeState !== DayTimeState.PAST;
	}

	getSelectedDayTimeState(day: Date): DayTimeState {
		const now = new Date();
		if (day.getFullYear() === now.getFullYear() && day.getMonth() === now.getMonth() && day.getDate() === now.getDate()) {
			return DayTimeState.PRESENT;
		}
		if (day < now) {
			return DayTimeState.PAST;
		}
		return DayTimeState.FUTURE;
	}

	getSuggestedPouchUsage(usage: Array<PouchUsage>, limit: number | null, now: Date): Array<PouchUsage> {
		if (limit === null) {
			return [];
		}

		if (usage.length >= limit) {
			return [];
		}

		const pouchesLeft = limit - usage.length;
		const timeStart = usage.length > 0 ? usage[usage.length - 1].dateTime : now;
		const timeEnd = new Date(now);
		timeEnd.setHours(23, 59, 59, 999);

		return Array.from({ length: pouchesLeft }).map((_, i) => {
			const t = (i + 1) / pouchesLeft;
			const time = new Date(timeStart.getTime() + t * (timeEnd.getTime() - timeStart.getTime()));
			return { dateTime: time };
		})
	}

	canShowSuggestedPouchUsage(dayTimeState: DayTimeState): boolean {
		return dayTimeState === DayTimeState.PRESENT;
	}

	getPouchesLeft(limit: number | null, pouches: Array<PouchUsage>): number {
		if (limit === null) {
			return 0;
		}

		if (pouches.length >= limit) {
			return 0;
		}

		return limit - pouches.length;
	}

	getCurrentPouchState(lastPouch: PouchUsage | null, now: Date): CurrentPouchState {
		if (lastPouch === null) {
			return { type: 'no-pouch' };
		}
		if (now.getTime() - lastPouch.dateTime.getTime() < this.POUCH_USAGE_TIME) {
			const timeLeftInSeconds = Math.floor((this.POUCH_USAGE_TIME - (now.getTime() - lastPouch.dateTime.getTime())) / 1000);
			return {
				type: 'pouch-used',
				timeLeftInSeconds: timeLeftInSeconds,
				progress: 1 - timeLeftInSeconds / (this.POUCH_USAGE_TIME / 1000)
			};
		}

		if (now.getTime() - lastPouch.dateTime.getTime() < this.POUCH_USAGE_TIME + this.ALERT_TIME) {
			return { type: 'pouch-ready' };
		}

		return { type: 'no-pouch' };
	}
}