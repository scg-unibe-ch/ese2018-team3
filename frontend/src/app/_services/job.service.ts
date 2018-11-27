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
	
	save(job: any) {
        return this.http.post(this.jobsUrl, job);
    }

    ngOnInit(): void {
    }

    getAll() {
        return this.http.get<Job[]>(this.jobsUrl);
    }

    getById(id: number) {
        return this.http.get(this.jobsUrl + `id/${{id}}`);
    }

    getByUserId(id: number) {
        return this.http.get(this.jobsUrl + `user/${{id}}`);
    }

    getByCompany(company: string) {
        return this.http.get(this.jobsUrl + `company/${{company}}`);
    }
}