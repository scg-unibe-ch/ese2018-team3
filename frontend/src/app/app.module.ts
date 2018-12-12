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
import {
    AdminJobEditorComponent,
    AdminJobsComponent,
    AdminPanelComponent,
    JobsChangedComponent,
    JobsUnapprovedComponent,
    UsersPanelComponent,
    UsersUnapprovedComponent
} from './admin-panel';
import {UserEditComponent} from './admin-panel/admin-users-panel/user-editor';
import {JobDetailComponent} from './job-offers/job-detail';
import {JobCreatorComponent} from './job-offers/job-creator';
import {MyJobsPanelComponent} from './job-offers/my-jobs-panel/my-jobs-panel.component';
import {NavbarComponent} from './navbar';
import {SidebarComponent} from './sidebar';
import {FooterComponent} from './footer/footer.component';
import {ErrorsComponent} from './_errors/errors.component';
import { SearchComponent } from './search/search.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { SearchingComponent } from './search/searching/searching.component';
import {AutoLogoutService} from './_services';


// @ts-ignore
@NgModule({
    declarations: [
        AboutComponent,
        AdComponent,
        AdminJobEditorComponent,
        AdminJobsComponent,
        AdminPanelComponent,
        AlertComponent,
        AlertComponent,
        AppComponent,
        ErrorsComponent,
        FooterComponent,
        HomeComponent,
        JobCreatorComponent,
        JobDetailComponent,
        JobOffersComponent,
        JobsChangedComponent,
        JobsUnapprovedComponent,
        LoginComponent,
        MyJobsPanelComponent,
        NavbarComponent,
        RegisterComponent,
        SidebarComponent,
        UserEditComponent,
        UsersPanelComponent,
        UsersUnapprovedComponent,
        FooterComponent,
        JobsUnapprovedComponent,
        AdminJobsComponent,
        AdminJobEditorComponent,
        SearchComponent,
        SearchBarComponent,
        SearchingComponent
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
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AutoLogoutService, multi:true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
