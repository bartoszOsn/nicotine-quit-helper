import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Repository } from '../api/Repository';
import { DomainRepository } from './DomainRepository';
import { provideStore } from '@ngrx/store';
import { reducer } from './ngrx/reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { Effects } from './ngrx/Effects';

export function provideDomain(): EnvironmentProviders {
	return makeEnvironmentProviders([
		{ provide: Repository, useClass: DomainRepository },
		provideStore({ ROOT: reducer }),
		provideEffects(Effects),
		provideStoreDevtools()
	])
}