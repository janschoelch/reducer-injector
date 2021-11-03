import { createReducer, on } from '@ngrx/store';
import { changeTheme, changeAutoNightMode } from './settings.actions';

import { Theme } from './theme.model';

export const FEATURE_SETTINGS_KEY = 'settings';

export interface State {
	theme: Theme;
	autoNightMode: boolean;
	nightTheme: Theme;
}

export const initialState: State = {
	theme: Theme.Light,
	nightTheme: Theme.Dark,
	autoNightMode: false,
};

export const settingsReducer = createReducer(
	initialState,
	on(
		changeTheme,
		changeAutoNightMode,
		(state, action): State => ({
			...state,
			...action,
		})
	)
);
