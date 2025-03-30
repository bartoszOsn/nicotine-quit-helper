import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'appInterval',
	pure: true
})
export class AppIntervalPipe implements PipeTransform {
    transform(value: number): string {
        const seconds = value % 60;
		const minutes = Math.floor((value / 60) % 60);

		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

}