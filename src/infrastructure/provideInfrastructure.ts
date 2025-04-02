import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DomainResource } from '../domain/DomainResource';
import { IndexedDbResource } from './IndexedDbResource';

export function provideInfrastructure(): EnvironmentProviders {
	return makeEnvironmentProviders([
		{ provide: DomainResource, useClass: IndexedDbResource }
	]);
}