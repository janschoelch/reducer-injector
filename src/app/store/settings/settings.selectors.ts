import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSettings from './settings.reducer';

const selectSettingsState = createFeatureSelector<fromSettings.State>(
	fromSettings.FEATURE_SETTINGS_KEY
);

export const selectSettings = createSelector(
	selectSettingsState,
	(state: fromSettings.State) => state
);

export const selectTheme = createSelector(
	selectSettingsState,
	(settings) => settings.theme
);

export const selectAutoNightMode = createSelector(
	selectSettings,
	(settings) => settings.autoNightMode
);

export const selectNightTheme = createSelector(
	selectSettings,
	(settings) => settings.nightTheme
);
