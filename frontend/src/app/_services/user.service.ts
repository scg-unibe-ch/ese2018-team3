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

	private URL = 'http://localhost:3000/user-services/';

	public currentUser: Observable<User>;
	private currentUserSubject: BehaviorSubject<User>;

	constructor(
		private alert: AlertService,
		private http: HttpClient,
	) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	save(user: any) {
		localStorage.setItem('currentUser', JSON.stringify({
			'id': user.id,
			'token': user.token
		}));
		this.currentUserSubject.next(user);
	}

	login(user: any) {
		return this.http.post(this.URL + 'login', user, {withCredentials: true});
	}

	logout() {
		this.http.post(this.URL + 'logout', this.currentUserValue, {withCredentials: true}).subscribe(
			() => {
				this.alert.success('Successfully logged out', true);
			},
			error => {
				this.alert.error(error, true);
			});
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}

	getAll() {
		return this.http.get<User[]>('http://localhost:3000/users/');
	}

	getById(id: number) {
		return this.http.get(this.URL + 'id/' + id);
	}

	register(user: any) {
		return this.http.post(this.URL + 'register', user, {withCredentials: true});
	}

	update(user: User) {
		return this.http.put(this.URL + 'update', user);
	}

	delete(id: number) {
		return this.http.post('http://localhost:3000/users/delete/id/' + id, this.currentUserValue, {withCredentials: true});
	}
}