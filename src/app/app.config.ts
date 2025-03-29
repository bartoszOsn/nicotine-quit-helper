import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideScheduledNotifications } from '../util/scheduled-notification/provideScheduledNotifications';

export const appConfig: ApplicationConfig = {
  providers: [
	  provideZoneChangeDetection({ eventCoalescing: true }),
	  provideRouter(routes),
	  provideScheduledNotifications()
  ]
};
