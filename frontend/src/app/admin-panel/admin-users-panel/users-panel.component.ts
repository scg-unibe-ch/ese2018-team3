import {Component, OnInit} from '@angular/core';
import {User} from '../../_models';
import {AdminService} from '../../_services';
import {Location} from '@angular/common';
import {ThemeService} from '../../_services/theme.service';

@Component({
    selector: 'app-users-panel',
    templateUrl: './users-panel.component.html',
    styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

    users: User[];

    constructor(
        private adminService: AdminService,
        private location: Location,
        private themeService: ThemeService
    ) {
    }

    ngOnInit() {
        this.users = [];
        this.loadAllUsers();
        if (this.themeService.getIsNight() == 'true'){
          this.themeService.changeDesignToNightTheme();
        }
    }

    goBack(): void {
        this.location.back();
    }

    private loadAllUsers() {
        this.adminService.getAllUsers().subscribe(users => {
            this.users = users;
        });
    }
}
