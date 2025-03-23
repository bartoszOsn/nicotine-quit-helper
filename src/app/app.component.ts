import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomainResource } from '../domain/DomainResource';
import { IndexedDbResource } from '../infrastructure/IndexedDbResource';
import { DomainStore } from '../domain/DomainStore';
import { Store } from '../api/Store';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	providers: [
		{ provide: DomainResource, useClass: IndexedDbResource },
		{ provide: Store, useClass: DomainStore },
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'nicotine-quit-helper';
}
