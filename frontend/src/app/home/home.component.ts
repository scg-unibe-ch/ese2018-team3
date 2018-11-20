import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {User} from '../_models';
import {UserService} from '../_services';


/**
 * The home component ets the current user from the authentication service by subscribing to the
 * _currentUser_ observable in the authentication service. The subscription for the current user is stored in a
 * variable so it can be unsubscribed from when the home component is destroyed. This is to prevent memory leaks
 * from orphaned subscriptions in the Angular 7 app.
 *
 * The home component gets all users from the user service and makes them available to the home template
 * via the _users_ property.
 */
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
	currentUser: User;
	currentUserSubscription: Subscription;
	users: User[] = [];

	constructor(
		private userService: UserService
	) {
		this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
			this.currentUser = user;
		});
	}

	ngOnInit() {
		this.loadAllUsers();
	}

	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this.currentUserSubscription.unsubscribe();
	}

	deleteUser(id: number) {
		this.userService.delete(id).subscribe(() => {
			this.loadAllUsers()
		});
	}

	private loadAllUsers() {
		this.userService.getAll().subscribe(users => {
			this.users = users;
		});
	}
}