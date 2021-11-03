import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { changeTheme } from 'src/app/store/settings/settings.actions';
import { selectTheme } from 'src/app/store/settings/settings.selectors';
import { Theme } from 'src/app/store/settings/theme.model';

@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit, OnDestroy {
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map((result) => result.matches),
			shareReplay()
		);

	currentTheme: Theme | undefined;
	destroyed$ = new Subject<boolean>();

	constructor(
		private breakpointObserver: BreakpointObserver,
		private store: Store
	) {}

	ngOnInit(): void {
		this.store
			.select(selectTheme)
			.pipe(takeUntil(this.destroyed$))
			.subscribe((theme: Theme) => {
				this.currentTheme = theme;
			});
	}

	ngOnDestroy(): void {
		this.destroyed$.next(true);
		this.destroyed$.complete();
	}

	onChange(): void {
		const nextTheme =
			this.currentTheme == Theme.Light ? Theme.Dark : Theme.Light;

		this.store.dispatch(changeTheme(nextTheme));
	}
}
