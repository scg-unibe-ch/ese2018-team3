import {Component, OnInit} from '@angular/core';
import {AdminService, UserService} from '../_services';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    loggedIn: string;
    isAdmin: boolean;

    hasUnapprovedJobs = false;
    hasUnapprovedUsers = false;

    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private router: Router,
    ) {
        this.userService.currentUser.subscribe(x => this.loggedIn = x);
    }

    ngOnInit() {
        this.loadUnapproved();
        const header = document.getElementById('topnav');
        const btns = header.getElementsByClassName('w3-button');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                var current = document.getElementsByClassName('active');
                current[0].className = current[0].className.replace(' active', '');
                this.className += ' active';
            });
        }
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/home']);
    }

    async loadUnapproved() {
        this.adminService.getAllUnapprovedJobs().subscribe( jobs => {
            if (jobs.length > 0) this.hasUnapprovedJobs = true;
        });
        this.adminService.getAllUnapprovedUsers().subscribe( users => {
            if (users.length > 0) this.hasUnapprovedUsers = true;
        });
    }
}
