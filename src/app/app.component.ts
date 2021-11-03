import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTheme } from './store/settings/settings.selectors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'reducer-injector';

	theme$: Observable<string> | undefined;

	constructor(private store: Store) {
		this.theme$ = this.store.select(selectTheme);
	}
}
