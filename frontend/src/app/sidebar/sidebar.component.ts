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

    hasUnapprovedJobs = false;
    hasUnapprovedUsers = false;

    constructor(
        private userService: UserService,
        private adminService: AdminService
    ) {
    }

    ngOnInit() {
        this.loadUnapproved();
        this.userService.currentUser.subscribe(x => this.loggedIn = x);
        this.adminService.isAdmin.subscribe(x => this.isAdmin = x);
    }

    async loadUnapproved() {
        this.adminService.getAllUnapprovedJobs().subscribe( jobs => {
            this.hasUnapprovedJobs = jobs.length > 0;
        });
        this.adminService.getAllUnapprovedUsers().subscribe( users => {
            this.hasUnapprovedUsers = users.length > 0;
        });
    }
}
