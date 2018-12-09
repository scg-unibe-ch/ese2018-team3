import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home';
import {AboutComponent} from './about/about.component';

import {JobOffersComponent} from './job-offers';
import {JobDetailComponent} from './job-offers/job-detail';

import {LoginComponent} from './login';
import {RegisterComponent} from './register';

import {AuthGuard} from './_guards';

import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {UserEditComponent, UsersPanelComponent} from './admin-panel/users-panel';
import {JobCreatorComponent} from './job-offers/job-creator';
import {UsersUnapprovedComponent} from './admin-panel/users-panel/users-unapproved';
import {MyJobsPanelComponent} from './job-offers/my-jobs-panel/my-jobs-panel.component';
import {JobsUnapprovedComponent} from './admin-panel/jobs-unapproved';
import {AdminAuthGuard} from './_guards/admin-auth.guard';
import {AdminJobsComponent} from './admin-panel/admin-jobs/admin-jobs.component';
import {AdminJobEditorComponent} from './admin-panel/admin-jobs/admin-job-editor/admin-job-editor.component';

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

    {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    {path: 'admin-panel/users', component: UsersPanelComponent, canActivate: [AuthGuard]},
    {
        path: 'admin-panel/users-unapproved',
        component: UsersUnapprovedComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
    },
    {path: 'admin-panel/users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    {path: 'admin-panel/jobs-unapproved', component: JobsUnapprovedComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    {path: 'admin-panel/jobs', component: AdminJobsComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/jobs/edit/:id', component: AdminJobEditorComponent, canActivate: [AuthGuard, AdminAuthGuard]},

    //{path: 'job/new', component: ProfileNewJobComponent},
    //{path: 'profile', component: JobManagementComponent},

    // otherwise redirect to home
    {path: '**', redirectTo: '/home'}
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled'
});
