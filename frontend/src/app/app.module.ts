import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AboutComponent} from './about/about.component';
import {AppRoutingModule} from './app-routing.module';
import {JobOffersComponent} from './job-offers';
import {RegisterComponent} from './register';
import {LoginComponent} from './login';
import {HomeComponent} from './home';
import {AlertComponent} from './_components';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {AdComponent} from './ad/ad.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {UsersPanelComponent} from './admin-panel/users-panel';
import {UserEditComponent} from './admin-panel/users-panel/user-editor';
import {JobDetailComponent} from './job-offers/job-detail';
import {JobCreatorComponent} from './job-offers/job-creator';
import {UsersUnapprovedComponent} from './admin-panel/users-panel/users-unapproved';
import {MyJobsPanelComponent} from './job-offers/my-jobs-panel/my-jobs-panel.component';
import {NavbarComponent} from './navbar';
import {SidebarComponent} from './sidebar';
import {FooterComponent} from './footer/footer.component';
import {JobsUnapprovedComponent} from './admin-panel/jobs-unapproved';
import {AdminJobsComponent} from './admin-panel/admin-jobs/admin-jobs.component';
import {AdminJobEditorComponent} from './admin-panel/admin-jobs/admin-job-editor/admin-job-editor.component';
import {ErrorsComponent} from './_errors/errors.component'

// @ts-ignore
@NgModule({
    declarations: [
        AlertComponent,
        AboutComponent,
        AppComponent,
        AlertComponent,
        HomeComponent,
        JobOffersComponent,
        LoginComponent,
        RegisterComponent,
        AdComponent,
        AdminPanelComponent,
        UsersPanelComponent,
        UserEditComponent,
        JobDetailComponent,
        JobCreatorComponent,
        UsersUnapprovedComponent,
        MyJobsPanelComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        JobsUnapprovedComponent,
        AdminJobsComponent,
        AdminJobEditorComponent,
        ErrorsComponent
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
