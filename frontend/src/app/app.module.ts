import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JobEditorComponent } from './job-editor';
import { AboutComponent} from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { JobOverviewComponent } from './job-overview/job-overview.component';
import {RegisterComponent} from './register';
import {LoginComponent} from './login';
import {HomeComponent} from './home';
import {AlertComponent} from './_components';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import { JobDisplayComponent } from './job-display/job-display.component';

// @ts-ignore
@NgModule({
	declarations: [
		AlertComponent,
        AboutComponent,
		AppComponent,
        AlertComponent,
        HomeComponent,
        JobEditorComponent,
        JobDisplayComponent,
        JobOverviewComponent,
        LoginComponent,
        RegisterComponent,
        JobDisplayComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
        ReactiveFormsModule,
		AppRoutingModule
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
