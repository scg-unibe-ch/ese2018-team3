import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Job} from '../_models';

/**
 * The user service contains a standard set of CRUD methods for managing users.
 * It acts as the interface between the Angular application and the backend api.
 */
@Injectable({providedIn: 'root'})
export class JobService implements OnInit {

    private jobsUrl: string = 'http://localhost:3000/jobs/';

    constructor(
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
    }

    save(job: Job) {
        return this.http.post(this.jobsUrl, job);
    }

    update(job: Job) {
        return this.http.put(this.jobsUrl + `${job.id}`, job);
    }

    getAll() {
        return this.http.get<Job[]>(this.jobsUrl);
    }

    getById(id: number) {
        return this.http.get(this.jobsUrl + `id/${id}`);
    }

    //TODO Check if this is a correct call, it seems to not match any jobs the way we're searching
    // Above To-Do inserted by Brian
    getFromCurrentUser() {
        return this.http.get<Job[]>(this.jobsUrl + `current-user`);
    }

    getByUserId(id: number) {
        return this.http.get<Job[]>(this.jobsUrl + `user/${id}`);
    }

    getByCompany(company: string) {
        return this.http.get(this.jobsUrl + `company/${company}`);
    }
}
