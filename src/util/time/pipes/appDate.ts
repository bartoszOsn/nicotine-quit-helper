import { inject, Pipe, PipeTransform } from '@angular/core';
import { Day } from '../model/Day';
import { DatePipe } from '@angular/common';

@Pipe({
	name: 'appDate',
	pure: true
})
export class AppDatePipe implements PipeTransform {
    transform(value: Day | null) {
		if (!value) {
			return null;
		}

        const date = new Date(value.year, value.month, value.day);
		return date.toLocaleDateString(undefined, { month: 'short' , day: '2-digit', year: 'numeric' });
    }
}