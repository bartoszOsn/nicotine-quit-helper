import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideInfrastructure } from '../infrastructure/provideInfrastructure';
import { provideDomain } from '../domain/provideDomain';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({eventCoalescing: true}),
		provideRouter(routes),
  		provideInfrastructure(),
		provideDomain()
	]
};
