import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Job, User} from '../_models';
import {UserService} from './user.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AdminService {

    public isAdmin: Observable<string>;
    private userServiceUrl: string = 'http://localhost:3000/user-services/';
    private usersUrl: string = 'http://localhost:3000/users/';
    private adminsUrl: string = 'http://localhost:3000/admins/';
    private jobsUrl: string = 'http://localhost:3000/jobs/';
    private isAdminSubject: BehaviorSubject<string>;

    constructor(
        private alert: AlertService,
        private userService: UserService,
        private http: HttpClient
    ) {
        this.isAdminSubject = new BehaviorSubject<string>(localStorage.getItem('isA'));
        this.isAdmin = this.isAdminSubject.asObservable();
    }

    public get isAdminValue(): string {
        return this.isAdminSubject.value;
    }

    auth(): Observable<HttpResponse<Object>> {
        return this.http.get(this.adminsUrl + `auth/`, {observe: 'response'});
    }

    getAllJobs() {
        return this.http.get<Job[]>(this.jobsUrl);
    }

    getJobById(id) {
        return this.http.get(this.jobsUrl + `id/${id}`);
    }

    getAllChangedJobs() {
        return this.http.get<Job[]>(this.jobsUrl + 'changed');
    }

    getAllUnapprovedJobs() {
        return this.http.get<Job[]>(this.jobsUrl + 'unapproved');
    }

    getAllUsers() {
        return this.http.get<User[]>(this.usersUrl);
    }

    getAllUnapprovedUsers() {
        return this.http.get<User[]>(this.usersUrl + 'unapproved');
    }

    getUser(user: number) {
        return this.http.get(this.usersUrl + `id/${user}`);
    }

    changeUserApproval(user: number, approval: boolean) {
        return this.http.put(this.usersUrl + `approve/id/${user}`, approval);
    }

    updateUser(user: any) {
        return this.http.put(this.usersUrl + `id/${user.id}`, user);
    }

    updateJob(job: any) {
        return this.http.put(this.jobsUrl + `admin/${job.id}`, job);
    }

    deleteUser(user: number) {
        return this.http.delete(this.usersUrl + user);
    }

    deleteJob(job: number) {
        return this.http.delete(this.jobsUrl + job);
    }
}