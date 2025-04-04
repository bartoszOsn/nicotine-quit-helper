import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, rootEffectsInit } from '@ngrx/effects';
import {
	addPouchUsageAction,
	fetchLimitForSelectedDayAction,
	fetchLimitForSelectedDaySuccessAction, fetchPouchUsagesForSelectedDayAction, fetchPouchUsagesForSelectedDaySuccessAction,
	nextDayAction,
	previousDayAction,
	setLimitForSelectedDayAction
} from './actions';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './AppState';
import { concatLatestFrom } from '@ngrx/operators';
import { selectSelectedDay } from './selectors';
import { DomainConverter } from '../DomainConverter';
import { DomainResource } from '../DomainResource';

@Injectable()
export class Effects {
	private actions$ = inject(Actions);
	private store = inject(Store<AppState>);
	private domainConverter = inject(DomainConverter);
	private domainResource = inject(DomainResource);

	readonly fetchLimitForSelectedDay$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(rootEffectsInit, fetchLimitForSelectedDayAction, nextDayAction, previousDayAction),
			concatLatestFrom(() => this.store.select(selectSelectedDay)),
			switchMap(([_, selectedDayStringified]) => {
				const selectedDay = this.domainConverter.stringifiedToDate(selectedDayStringified);

				return this.domainResource.fetchPouchLimitForDay(selectedDay);
			}),
			map(limit => fetchLimitForSelectedDaySuccessAction({ limit }))
		)
	});

	readonly setLimitForSelectedDay$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(setLimitForSelectedDayAction),
			concatLatestFrom(() => this.store.select(selectSelectedDay)),
			switchMap(([action, selectedDayStringified]) => {
				const selectedDay = this.domainConverter.stringifiedToDate(selectedDayStringified);

				return this.domainResource.setPouchLimitForDay(selectedDay, action.limit);
			}),
			map(() => fetchLimitForSelectedDayAction())
		)
	});

	readonly fetchPouchUsagesForSelectedDay$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(rootEffectsInit, fetchPouchUsagesForSelectedDayAction, nextDayAction, previousDayAction),
			concatLatestFrom(() => this.store.select(selectSelectedDay)),
			switchMap(([_, selectedDayStringified]) => {
				const selectedDay = this.domainConverter.stringifiedToDate(selectedDayStringified);

				return this.domainResource.fetchPouchUsageForDay(selectedDay);
			}),
			map(usages => fetchPouchUsagesForSelectedDaySuccessAction({ usages }))
		);
	});

	readonly addPouchUsage$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(addPouchUsageAction),
			switchMap((action) => {
				return this.domainResource.addPouchUsageForDay(action.usage);
			}),
			map(() => fetchPouchUsagesForSelectedDayAction())
		);
	});
}