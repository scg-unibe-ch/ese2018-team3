import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

    private usersPanel: string = '/admin-panel/users';
    private jobsPanel: string = '/admin-panel/jobs';

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
    }

    toUsersPanel() {
        this.router.navigate([this.usersPanel]);
    }

    toJobsPanel() {
        this.router.navigate([this.jobsPanel]);
    }
}
