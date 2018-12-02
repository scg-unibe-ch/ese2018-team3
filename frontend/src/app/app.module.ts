import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {UserEditComponent} from './admin-panel/users-panel/user-editor';
import {JobDetailComponent} from './job-overview/job-detail';
import {JobCreatorComponent} from './job-overview/job-creator';
import {UsersUnapprovedComponent} from './admin-panel/users-panel/users-unapproved';
import {MyJobsPanelComponent} from './job-overview/my-jobs-panel/my-jobs-panel.component';
import {NavbarComponent} from './navbar';
import {SidebarComponent} from './sidebar';
import {FooterComponent} from './footer/footer.component';
import { JobsUnapprovedComponent } from './admin-panel/jobs-unapproved';

// @ts-ignore
@NgModule({
    declarations: [
        AlertComponent,
        AboutComponent,
        AppComponent,
        AlertComponent,
        HomeComponent,
        JobOverviewComponent,
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
        JobsUnapprovedComponent
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
