import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Repository } from '../api/Repository';
import { DomainRepository } from './DomainRepository';
import { provideStore } from '@ngrx/store';
import { DomainConverter } from './DomainConverter';
import { REDUCER_TOKEN } from './ngrx/REDUCER_TOKEN';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { Effects } from './ngrx/Effects';

export function provideDomain(): EnvironmentProviders {
	return makeEnvironmentProviders([
		{ provide: Repository, useClass: DomainRepository },
		DomainConverter,
		provideStore(REDUCER_TOKEN),
		provideEffects(Effects),
		provideStoreDevtools()
	])
}