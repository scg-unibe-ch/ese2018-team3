import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    loggedIn: string;

    constructor(
        private userService: UserService
    ) {
        this.userService.currentUser.subscribe(x => this.loggedIn = x);
    }

    ngOnInit() {
    }

}
