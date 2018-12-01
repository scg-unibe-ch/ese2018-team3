import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../_models';
import {UserService} from './user.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AdminService {

    private userServiceUrl: string = 'http://localhost:3000/user-services/';
    private usersUrl: string = 'http://localhost:3000/users/';
    private adminsUrl: string = 'http://localhost:3000/admins/';
    private jobsUrl: string = 'http://localhost:3000/jobs/';

    constructor(
        private alert: AlertService,
        private userService: UserService,
        private http: HttpClient
    ) {
    }

    auth(): Observable<HttpResponse<Object>> {
        return this.http.get(this.adminsUrl + `auth/`, { observe: 'response' });
    }

    getAllUsers() {
        return this.http.get<User[]>(this.usersUrl);
    }

    getAllUnapproved() {
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

    deleteUser(user: number | string) {
        return this.http.delete(this.usersUrl + `delete/id/${user}`);
    }
}