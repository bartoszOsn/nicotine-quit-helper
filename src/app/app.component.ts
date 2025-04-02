import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomainResource } from '../domain/DomainResource';
import { IndexedDbResource } from '../infrastructure/IndexedDbResource';
import { DomainRepository } from '../domain/DomainRepository';
import { Repository } from '../api/Repository';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	providers: [
		{ provide: DomainResource, useClass: IndexedDbResource },
		{ provide: Repository, useClass: DomainRepository },
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'nicotine-quit-helper';
}
