import { Injectable } from '@angular/core';
import { StringifiedDate } from './model/StringifiedDate';

@Injectable()
export class DomainConverter {
	dateToStringified(date: Date): StringifiedDate {
		return date.toISOString() as StringifiedDate;
	}

	stringifiedToDate(stringifiedDate: StringifiedDate): Date {
		return new Date(stringifiedDate);
	}
}