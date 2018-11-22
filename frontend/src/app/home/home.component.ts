import {Component, OnInit} from '@angular/core';

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
export class HomeComponent implements OnInit {

    constructor(
    ) {
    }

    ngOnInit() {
    }
}