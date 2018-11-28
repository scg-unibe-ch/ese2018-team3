import {Component, OnInit} from '@angular/core';
import {User} from '../../../_models';
import {AdminService} from '../../../_services';
import {Location} from '@angular/common';

@Component({
    selector: 'app-users-unapproved',
    templateUrl: './users-unapproved.component.html',
    styleUrls: ['./users-unapproved.component.css']
})
export class UsersUnapprovedComponent implements OnInit {

    users: User[];

    constructor(
        private adminService: AdminService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.users = [];
        this.loadAllUnapproved()
    }

    private loadAllUnapproved() {
        this.adminService.getAllUnapproved().subscribe(users => {
            this.users = users;
        });
    }

    goBack(): void {
      this.location.back();
    }
}
