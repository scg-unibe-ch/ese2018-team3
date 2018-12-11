import {Component, OnInit} from '@angular/core';
import {User} from '../../../_models';
import {AdminService} from '../../../_services';
import {Location} from '@angular/common';
import {ThemeService} from '../../../_services/theme.service';

@Component({
    selector: 'app-users-unapproved',
    templateUrl: './users-unapproved.component.html',
    styleUrls: ['./users-unapproved.component.css']
})
export class UsersUnapprovedComponent implements OnInit {

    users: User[];

    constructor(
        private adminService: AdminService,
        private location: Location,
        private themeService: ThemeService
    ) {
    }

    ngOnInit() {
        this.users = [];
        this.loadAllUnapproved();
        if (this.themeService.getIsNight() == 'true'){
          this.themeService.changeDesignToNightTheme();
        }
    }

    goBack(): void {
        this.location.back();
    }

    private loadAllUnapproved() {
        this.adminService.getAllUnapprovedUsers().subscribe(users => {
            this.users = users;
        });
    }
}
