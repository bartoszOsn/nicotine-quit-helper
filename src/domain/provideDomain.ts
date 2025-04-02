import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Repository } from '../api/Repository';
import { DomainRepository } from './DomainRepository';

export function provideDomain(): EnvironmentProviders {
	return makeEnvironmentProviders([
		{ provide: Repository, useClass: DomainRepository }
	])
}