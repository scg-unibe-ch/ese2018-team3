import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models';

@Injectable({providedIn: 'root'})
export class AdminService {

    private userServiceUrl: string = 'http://localhost:3000/user-services/';
    private usersUrl: string = 'http://localhost:3000/users/';
    private adminsUrl: string = 'http://localhost:3000/admins/';
    private jobsUrl: string = 'http://localhost:3000/jobs/';

    constructor(
        private alert: AlertService,
        private http: HttpClient
    ) {
    }

    getAllUsers() {
        return this.http.get<User[]>(this.usersUrl);
    }

    getAllUnapproved() {
        return this.http.get<User[]>(this.usersUrl + 'unapproved');
    }

    getUser(user: number | string) {
        return this.http.get(this.usersUrl + `${typeof user === 'number' ? 'id' : 'username'}/${user}`);
    }

    changeUserApproval(user: number | string, approval: boolean) {
        return this.http.put(this.usersUrl + `approve/${typeof user === 'number' ? 'id' : 'username'}/${user}`, approval);
    }

    updateUser(user: any) {
        return this.http.put(this.usersUrl + user.id, user);
    }

    deleteUser(user: number | string) {
        return this.http.delete(this.usersUrl + `approve/${typeof user === 'number' ? 'id' : 'username'}/${user}\``);
    }
}