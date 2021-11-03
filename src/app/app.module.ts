import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SettingsStateModule } from './store/settings/settings.state.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		CoreModule,
		CommonModule,
		AppRoutingModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		SettingsStateModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
