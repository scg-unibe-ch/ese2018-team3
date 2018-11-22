import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../_models';
import {BehaviorSubject, Observable} from 'rxjs';
import {AlertService} from './alert.service';

/**
 * The user service contains a standard set of CRUD methods for managing users.
 * It acts as the interface between the Angular application and the backend api.
 */
@Injectable({providedIn: 'root'})
export class UserService {

    public currentUser: Observable<string>;
    private URL = 'http://localhost:3000/user-services/';
    private currentUserSubject: BehaviorSubject<string>;

    constructor(
        private alert: AlertService,
        private http: HttpClient,
    ) {
        this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): string {
        return this.currentUserSubject.value;
    }

    save(token: string) {
        localStorage.setItem('currentUser', token);
        this.currentUserSubject.next(localStorage.getItem('currentUser'));
    }

    clearLogin() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    login(user: any) {
        return this.http.post(this.URL + 'login', user, {withCredentials: true});
    }

    logout() {
        this.http.post(this.URL + 'logout', {withCredentials: true}).subscribe(
            () => {
                this.alert.success('Successfully logged out', true);
            },
            error => {
                this.alert.error(error, true);
            });
        this.clearLogin();
    }

    getAll() {
        return this.http.get<User[]>('http://localhost:3000/users/');
    }

    getById(id: number) {
        return this.http.get(`http://localhost:3000/users/id/${id}`);
    }

    getByName(name: string) {
        return this.http.get(`http://localhost:3000/users/username/${name}`);
    }

    register(user: any) {
        return this.http.post(this.URL + 'register', user, {withCredentials: true});
    }

    delete(id: number) {
        return this.http.delete('http://localhost:3000/users/id/' + id, {withCredentials: true});
    }
}