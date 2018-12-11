import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home';
import {AboutComponent} from './about/about.component';

import {JobOffersComponent} from './job-offers';
import {JobDetailComponent} from './job-offers/job-detail';

import {LoginComponent} from './login';
import {RegisterComponent} from './register';

import {AuthGuard} from './_guards';

import {
    AdminJobEditorComponent,
    AdminJobsComponent,
    AdminPanelComponent, JobsChangedComponent,
    JobsUnapprovedComponent,
    UserEditComponent,
    UsersPanelComponent,
    UsersUnapprovedComponent
} from './admin-panel';
import {JobCreatorComponent} from './job-offers/job-creator';
import {MyJobsPanelComponent} from './job-offers/my-jobs-panel/my-jobs-panel.component';
import {ErrorsComponent} from './_errors/errors.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},

    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    {path: 'jobs', component: JobOffersComponent},
    {path: 'jobs/:id', component: JobDetailComponent},
    {path: 'job-creator', component: JobCreatorComponent, canActivate: [AuthGuard]},
    {path: 'my-jobs-panel', component: MyJobsPanelComponent, canActivate: [AuthGuard]},

    {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/users', component: UsersPanelComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/users-unapproved', component: UsersUnapprovedComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/jobs-unapproved', component: JobsUnapprovedComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/jobs-changed', component: JobsChangedComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/jobs', component: AdminJobsComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/jobs/edit/:id', component: AdminJobEditorComponent, canActivate: [AuthGuard]},

    {path: '404', component: ErrorsComponent},

    //{path: 'job/new', component: ProfileNewJobComponent},
    //{path: 'profile', component: JobManagementComponent},

    // otherwise redirect to home
    {path: '**', redirectTo: '/404'}
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled'
});
