import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchLimitForSelectedDay, fetchLimitForSelectedDaySuccess } from './actions';
import { map, switchMap } from 'rxjs';
import { DomainResource } from '../DomainResource';
import { Store as NgRxStore } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { AppState } from './AppState';
import { SimpleSelectors } from './SimpleSelectors';

@Injectable()
export class Effects {
	private readonly actions$ = inject(Actions);
	private readonly domainResource = inject(DomainResource);
	private readonly ngrxStore: NgRxStore<AppState> = inject(NgRxStore<AppState>);

	readonly fetchLimitForSelectedDay$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fetchLimitForSelectedDay),
			concatLatestFrom(() => this.ngrxStore.select(SimpleSelectors.selectSelectedDay)),
			switchMap(([_action, selectedDay]) => {
				return this.domainResource.fetchPouchLimitForDay(new Date(selectedDay));
			}),
			map(limit => fetchLimitForSelectedDaySuccess({ limit: limit }))
		)
	});
}