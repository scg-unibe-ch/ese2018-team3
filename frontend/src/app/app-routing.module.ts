import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home';
import {AboutComponent} from './about/about.component';

import {JobOverviewComponent} from './job-overview';
import {JobDetailComponent} from './job-overview/job-detail';
import {JobEditorComponent} from './job-editor';

import {LoginComponent} from './login';
import {RegisterComponent} from './register';

import {AuthGuard} from './_guards';

import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {UserEditComponent, UsersPanelComponent} from './admin-panel/users-panel';
import {UserDetailComponent} from './admin-panel/users-panel/';
import {JobCreatorComponent} from './job-overview/job-creator/job-creator.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    {path: 'jobs', component: JobOverviewComponent},
    {path: 'jobs/:id', component: JobDetailComponent},
    {path: 'job-creator', component: JobCreatorComponent},


    {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/users', component: UsersPanelComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/users/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
    {path: 'admin-panel/users/:id/edit', component: UserEditComponent, canActivate: [AuthGuard]},

    //{path: 'job/new', component: ProfilNewJobComponent},
    //{path: 'profil', component: JobManagementComponent},

    {path: 'job-editor/:id', component: JobEditorComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    {path: '**', redirectTo: '/home'}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
