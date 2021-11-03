import { createAction } from '@ngrx/store';
import { Theme } from './theme.model';

export const changeTheme = createAction(
	'[Settings] Change Theme',
	(theme: Theme) => ({ theme })
);

export const changeAutoNightMode = createAction(
	'[Settings] Change Auto Night Mode',
	(autoNightMode: boolean) => ({ autoNightMode })
);
