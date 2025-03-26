import { ElementRef, inject, Renderer2 } from '@angular/core';

export function setHostClasses(...classes: Array<string>): void {
	const elementRef = inject(ElementRef);
	const renderer = inject(Renderer2);

	const splitClasses = classes.map(className => className.split(/\s+/)).flat();

	splitClasses.forEach(className => {
		renderer.addClass(elementRef.nativeElement, className);
	});
}