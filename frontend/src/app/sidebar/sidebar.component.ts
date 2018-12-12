import {Component, OnInit} from '@angular/core';
import {AdminService, UserService} from '../_services';
import {ThemeService} from '../_services/theme.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    loggedIn: string;
    isAdmin: string;

    hasChangedJobs = false;
    hasUnapprovedJobs = false;
    hasUnapprovedUsers = false;

    constructor(
        private userService: UserService,
        private adminService: AdminService,
        private themeService: ThemeService
    ) {
    }

    ngOnInit() {
        if (this.themeService.getIsNight() == 'true'){
         this.themeService.changeDesignToNightTheme();
        }

        this.userService.currentUser.subscribe(x => this.loggedIn = x);
        this.adminService.isAdmin.subscribe(x => {
            this.isAdmin = x;
            if (this.isAdmin) this.loadAll();
        });
    }

    async loadAll() {
        this.adminService.getAllChangedJobs().subscribe(jobs => this.hasChangedJobs = jobs.length > 0);
        this.adminService.getAllUnapprovedJobs().subscribe(jobs => this.hasUnapprovedJobs = jobs.length > 0);
        this.adminService.getAllUnapprovedUsers().subscribe(users => this.hasUnapprovedUsers = users.length > 0);
    }
}
