import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from './_services';
import {environment} from '../environments/environment';
import {User} from './_models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

    currentUser: User;
	title = 'Job For You';
	baseUrl = environment.baseUrl;

	constructor(
        private router: Router,
        private userService: UserService
    ) {
		this.userService.currentUser.subscribe(x => this.currentUser = x);
   		// this.baseUrl = environment.baseUrl;
	}

    logout() {
        this.userService.logout();
        this.router.navigate(['/home']);
    }
}
