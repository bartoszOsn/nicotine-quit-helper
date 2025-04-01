import { Injectable } from '@angular/core';
import { Day } from './model/Day';
import { Interval } from './model/Interval';

@Injectable({ providedIn: 'root' })
export class TimeService {
	getToday(): Day {
		const now = new Date();
		return new Day(now.getFullYear(), now.getMonth(), now.getDate());
	}

	addDays(date: Day, days: number): Day {
		const nativeDate = new Date(date.year, date.month, date.day);
		const resultNativeDate = new Date(nativeDate.getTime() + days * 24 * 60 * 60 * 1000);
		return new Day(resultNativeDate.getFullYear(), resultNativeDate.getMonth(), resultNativeDate.getDate());
	}

	isToday(date: Day): boolean {
		const today = this.getToday();
		return today.equals(date);
	}

	isInPast(date: Day): boolean {
		const today = this.getToday();

		if (today.equals(date)) {
			return false;
		}

		const nativeDate = new Date(date.year, date.month, date.day);
		const todayNativeDate = new Date(today.year, today.month, today.day);

		return nativeDate < todayNativeDate;
	}

	getTimeFromStartOfDay(date: Day): Interval {
		const nativeDate = new Date(date.year, date.month, date.day);
		return new Interval(Date.now() - nativeDate.getTime());
	}
}