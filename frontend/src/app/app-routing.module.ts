import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobListComponent }   from './job-list/job-list.component';
import { JobComponent }      from './job/job.component';
import { JobItemComponent}  from './job-item/job-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'jobList', component: JobListComponent },

  { path: 'jobs', component: JobComponent },
  { path: 'detail/:jobListId', component: JobItemComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
