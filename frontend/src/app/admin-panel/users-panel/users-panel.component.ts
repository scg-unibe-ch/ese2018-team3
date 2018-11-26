import {Component, OnInit} from '@angular/core';
import {User} from '../../_models';
import {AdminService} from '../../_services';

@Component({
    selector: 'app-users-panel',
    templateUrl: './users-panel.component.html',
    styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

    users: User[];

    constructor(
        private adminService: AdminService
    ) {
    }

    ngOnInit() {
        this.users = [];
        this.loadAllUsers()
    }

    private loadAllUsers() {
        this.adminService.getAllUsers().subscribe(users => {
            this.users = users;
        });
    }
}
