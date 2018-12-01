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

    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private router: Router,
    ) {
        this.userService.currentUser.subscribe(x => this.loggedIn = x);
        this.loadAdmin();
    }

    async loadAdmin() {
        await this.adminService.auth().subscribe(response => {
            this.isAdmin = response.ok;
        });
    }

    ngOnInit() {
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/home']);
    }
}
