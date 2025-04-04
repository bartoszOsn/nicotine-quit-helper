import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Repository } from '../api/Repository';
import { DomainRepository } from './DomainRepository';
import { provideStore } from '@ngrx/store';
import { REDUCER_TOKEN } from './ngrx/REDUCER_TOKEN';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { Effects } from './ngrx/Effects';
import { DomainService } from './DomainService';

export function provideDomain(): EnvironmentProviders {
	return makeEnvironmentProviders([
		{ provide: Repository, useClass: DomainRepository },
		DomainService,
		provideStore(REDUCER_TOKEN),
		provideEffects(Effects),
		provideStoreDevtools()
	])
}