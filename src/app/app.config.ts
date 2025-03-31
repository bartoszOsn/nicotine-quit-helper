import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DomainResource } from '../domain/DomainResource';
import { IndexedDbResource } from '../infrastructure/IndexedDbResource';
import { provideDomain } from '../domain/provideDomain';

export const appConfig: ApplicationConfig = {
  providers: [
	  provideZoneChangeDetection({ eventCoalescing: true }),
	  provideRouter(routes),
	  { provide: DomainResource, useClass: IndexedDbResource },
	  provideDomain()
  ]
};
