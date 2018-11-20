import { RouterModule, Routes } from '@angular/router';
import { AboutComponent} from './about/about.component';

import { JobOverviewComponent} from './job-overview/job-overview.component';
import { JobListComponent }   from './job-list/job-list.component';

import { JobItemComponent}  from './job-item/job-item.component';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    {path: 'jobList', component: JobListComponent},
    {path: 'jobOverview', component: JobOverviewComponent},

  //{path: 'job/new', component: ProfilNewJobComponent},
  //{path: 'profil', component: JobManagementComponent},

    {path: 'detail/:jobListId', component: JobItemComponent},

    // otherwise redirect to home
    {path: '**', redirectTo: '/home'}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
