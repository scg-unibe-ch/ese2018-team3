import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent} from './about/about.component';

import { JobListComponent }   from './job-list/job-list.component';
import { JobComponent }      from './job/job.component';
import { JobItemComponent}  from './job-item/job-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'home', redirectTo: '/'},
  { path: 'jobList', component: JobListComponent },

  {path: 'about', component: AboutComponent},
  //{path: 'login', component: LoginComponent},
  //{path: 'job/new', component: ProfilNewJobComponent},
  //{path: 'profil', component: JobManagementComponent},

  { path: 'jobs', component: JobComponent },
  { path: 'detail/:jobListId', component: JobItemComponent},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
