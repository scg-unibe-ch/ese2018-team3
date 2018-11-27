import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JobEditorComponent} from './job-editor';
import {AboutComponent} from './about/about.component';
import {AppRoutingModule} from './app-routing.module';
import {JobOverviewComponent} from './job-overview';
import {RegisterComponent} from './register';
import {LoginComponent} from './login';
import {HomeComponent} from './home';
import {AlertComponent} from './_components';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {AdComponent} from './ad/ad.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {UsersPanelComponent} from './admin-panel/users-panel';
import {JobsPanelComponent} from './admin-panel/jobs-panel/jobs-panel.component';
import {UserDetailComponent} from './admin-panel/users-panel/user-detail';
import {UserEditComponent} from './admin-panel/users-panel/user-edit';
import {JobDetailComponent} from './job-overview/job-detail';
import { JobCreatorComponent } from './job-overview/job-creator/job-creator.component';
import { UsersUnapprovedComponent } from './admin-panel/users-panel/users-unapproved/users-unapproved.component';
import { MyJobsComponent } from './job-overview/my-jobs/my-jobs.component';

// @ts-ignore
@NgModule({
    declarations: [
        AlertComponent,
        AboutComponent,
        AppComponent,
        AlertComponent,
        HomeComponent,
        JobEditorComponent,
        JobOverviewComponent,
        LoginComponent,
        RegisterComponent,
        AdComponent,
        AdminPanelComponent,
        UsersPanelComponent,
        JobsPanelComponent,
        UserDetailComponent,
        UserEditComponent,
        JobDetailComponent,
        JobCreatorComponent,
        UsersUnapprovedComponent,
        MyJobsComponent
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
