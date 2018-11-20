import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// Add css components from angular material
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JobItemComponent } from './job-item/job-item.component';
import { AboutComponent} from './about/about.component';
import { JobListComponent } from './job-list/job-list.component';
import { AppRoutingModule } from './app-routing.module';
import { JobOverviewComponent } from './job-overview/job-overview.component';
import {RegisterComponent} from './register';
import {LoginComponent} from './login';
import {HomeComponent} from './home';
import {AlertComponent} from './_components';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';

// @ts-ignore
@NgModule({
	declarations: [
		AlertComponent,
        AboutComponent,
		AppComponent,
        AlertComponent,
        HomeComponent,
        JobItemComponent,
        JobListComponent,
        JobOverviewComponent,
        LoginComponent,
        RegisterComponent
	],
	imports: [
		MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
        ReactiveFormsModule,
		MatButtonModule,
		MatListModule,
		MatInputModule,
		MatCheckboxModule,
		MatCardModule,
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
