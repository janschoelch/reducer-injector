import { Injectable } from '@angular/core';

const APP_PREFIX = 'injector-';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	setItem(key: string, value: any) {
		localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
	}

	getItem(key: string) {
		const item = localStorage.getItem(`${APP_PREFIX}${key}`);
		if (item) {
			return JSON.parse(item);
		}
		return undefined;
	}

	removeItem(key: string) {
		localStorage.removeItem(`${APP_PREFIX}${key}`);
	}
}
