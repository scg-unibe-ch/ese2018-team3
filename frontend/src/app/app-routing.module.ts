import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about/about.component';

import {JobOverviewComponent} from './job-overview/job-overview.component';

import {JobEditorComponent} from './job-editor';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthGuard} from './_guards';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    {path: 'jobOverview', component: JobOverviewComponent},

    //{path: 'job/new', component: ProfilNewJobComponent},
    //{path: 'profil', component: JobManagementComponent},

    {path: 'job-editor/:id', component: JobEditorComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    {path: '**', redirectTo: '/home'}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
