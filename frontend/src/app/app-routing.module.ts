import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent} from './about/about.component';

import { JobOverviewComponent} from './job-overview/job-overview.component';
import { JobListComponent }   from './job-list/job-list.component';

import { JobItemComponent}  from './job-item/job-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'home', redirectTo: '/'},
  { path: 'jobList', component: JobListComponent },
  { path: 'jobOverview', component: JobOverviewComponent },

  {path: 'about', component: AboutComponent},
  //{path: 'login', component: LoginComponent},
  //{path: 'job/new', component: ProfilNewJobComponent},
  //{path: 'profil', component: JobManagementComponent},

  { path: 'detail/:jobListId', component: JobItemComponent},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
