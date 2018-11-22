import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {JobItem} from '../_models';
import {AlertService} from './alert.service';

/**
 * The user service contains a standard set of CRUD methods for managing users.
 * It acts as the interface between the Angular application and the backend api.
 */
@Injectable({providedIn: 'root'})
export class UserService implements OnInit {

    private job_url = 'http://localhost:3000/job-item/';

    constructor(
        private alert: AlertService,
        private http: HttpClient,
    ) {
    }

    ngOnInit(): void {
    }

    getAll() {
        return this.http.get<JobItem[]>(this.job_url);
    }

    getById(id: number) {
        return this.http.get(this.job_url + `${id}`);
    }

    getFromUser(id: number) {
        return this.http.get(this.job_url + `user/${id}`);
    }

    update(job: JobItem) {
        return this.http.put(this.job_url + `${job.id}`, job);
        ;
    }

    delete(id: number) {
        return this.http.delete(this.job_url + `${id}`);
    }
}