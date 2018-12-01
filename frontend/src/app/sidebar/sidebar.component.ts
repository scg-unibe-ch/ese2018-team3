import {Component, OnInit} from '@angular/core';
import {AdminService, UserService} from '../_services';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    loggedIn: string;
    isAdmin: string;

    constructor(
        private userService: UserService,
        private adminService: AdminService
    ) {
    }

    ngOnInit() {
        this.userService.currentUser.subscribe(x => this.loggedIn = x);
        this.adminService.isAdmin.subscribe(x => this.isAdmin = x);
    }

}
