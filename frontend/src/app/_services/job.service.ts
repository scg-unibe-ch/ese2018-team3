import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Job} from '../_models';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

/**
 * The job service contains a standard set of CRUD methods for managing users.
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

    save(job: any) {
        return this.http.post(this.jobsUrl, job);
    }

    update(job: any) {
        return this.http.put(this.jobsUrl + job.id, job);
    }

    /* GET Jobs whose name contains search term */
    searchJobs(term: string): Observable<Job[]> {
      if (!term.trim()) {
        // if not search term, return empty job array.
        return of([]);
      }
      return this.http.get<Job[]>(`${this.jobsUrl}/?name=${term}`)

      //  tap(_ => this.log(`found heroes matching "${term}"`)), catchError(this.handleError<Job[]>('searchHeroes', []))
    }

    getAll() {
        return this.http.get<Job[]>(this.jobsUrl);
    }

    getById(id: number) {
        return this.http.get(this.jobsUrl + `id/${id}`);
    }

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
