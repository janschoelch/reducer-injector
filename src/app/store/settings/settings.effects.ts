import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { merge, of } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { withLatestFrom, tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import { changeAutoNightMode, changeTheme } from './settings.actions';
import { selectSettings, selectTheme } from './settings.selectors';
import * as fromSettings from './settings.reducer';

const INIT = of('app-init-effect-trigger');

@Injectable()
export class SettingsEffects {
	constructor(
		private actions$: Actions,
		private store: Store,
		private localStorageService: LocalStorageService,
		private ngZone: NgZone,
		private overlayContainer: OverlayContainer
	) {}

	persistSettings$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(changeAutoNightMode, changeTheme),
				concatLatestFrom(() => this.store.select(selectSettings)),
				tap(([_action, settings]) =>
					this.localStorageService.setItem(
						fromSettings.FEATURE_SETTINGS_KEY,
						settings
					)
				)
			);
		},
		{ dispatch: false }
	);

	updateTheme$ = createEffect(
		() => {
			return merge(INIT, this.actions$.pipe(ofType(changeTheme))).pipe(
				withLatestFrom(this.store.select(selectTheme)),
				tap(([_action, effectiveTheme]) => {
					const classList =
						this.overlayContainer.getContainerElement().classList;
					const toRemove = Array.from(classList).filter(
						(item: string) => item.includes('-theme')
					);
					if (toRemove.length) {
						classList.remove(...toRemove);
					}
					classList.add(effectiveTheme);
				})
			);
		},
		{ dispatch: false }
	);
}
