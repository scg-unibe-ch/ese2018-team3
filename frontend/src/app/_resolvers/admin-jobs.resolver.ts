import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {AdminService} from '../_services';
import {Job} from '../_models';
import {Observable} from 'rxjs';

@Injectable()
export class AdminJobsResolver implements Resolve<Promise<Job[]> | boolean> {

    constructor(
        private adminService: AdminService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<Job[]> | boolean {
       return this.adminService.getAllJobs().toPromise().then(jobs => {return jobs});
    }
}