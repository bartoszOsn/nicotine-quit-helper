import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { ScheduledNotificationService } from './ScheduledNotificationService';

// TODO:: handle no worker support
export function provideScheduledNotifications(): EnvironmentProviders {
	const workerUrl = (function GetWorkerUrl(): URL {
		const Worker = class WorkerStub {
			constructor(
				public url: URL,
				public options?: WorkerOptions
			) {}
		}

		const worker = new Worker(new URL('./ScheduledNotificationWorker.ts', import.meta.url), { type: 'module' });
		return worker.url;
	})();

	return makeEnvironmentProviders([
		provideAppInitializer(() => {
			const scheduledNotificationService = inject(ScheduledNotificationService);

			return window.navigator.serviceWorker.register(workerUrl, { type: 'module' })
				.then(() => scheduledNotificationService.init());
		}),
		ScheduledNotificationService
	]);
}