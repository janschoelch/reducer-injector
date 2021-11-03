import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreConfig, StoreModule } from '@ngrx/store';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import { SettingsEffects } from './settings.effects';
import * as fromSettings from './settings.reducer';

export const SETTINGS_CONFIG_TOKEN = new InjectionToken<
	StoreConfig<fromSettings.State>
>(fromSettings.FEATURE_SETTINGS_KEY);

export function settingsConfigFactory(
	localStorageService: LocalStorageService
): StoreConfig<fromSettings.State> {
	return {
		initialState: localStorageService.getItem(
			fromSettings.FEATURE_SETTINGS_KEY
		),
	};
}

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(
			fromSettings.FEATURE_SETTINGS_KEY,
			fromSettings.settingsReducer,
			SETTINGS_CONFIG_TOKEN
		),
		EffectsModule.forFeature([SettingsEffects]),
	],
	declarations: [],
	providers: [
		{
			provide: SETTINGS_CONFIG_TOKEN,
			deps: [LocalStorageService],
			useFactory: settingsConfigFactory,
		},
	],
})
export class SettingsStateModule {}
