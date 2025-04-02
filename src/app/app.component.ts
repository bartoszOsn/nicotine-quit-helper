import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomainRepository } from '../domain/DomainRepository';
import { Repository } from '../api/Repository';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	providers: [
		{ provide: Repository, useClass: DomainRepository },
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'nicotine-quit-helper';
}
