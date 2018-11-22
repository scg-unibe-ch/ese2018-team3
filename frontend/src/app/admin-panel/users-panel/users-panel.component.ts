import {Component, OnInit} from '@angular/core';
import {User} from '../../_models';
import {AdminService} from '../../_services/admin.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-users-panel',
    templateUrl: './users-panel.component.html',
    styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

    users: User[] = [];

    constructor(
        private adminService: AdminService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.loadAllUsers()
    }

    private loadAllUsers() {
        this.adminService.getAllUsers().subscribe(users => {
            this.users = users;
        });
    }
}
