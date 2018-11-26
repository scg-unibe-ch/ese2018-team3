import {Component, OnInit} from '@angular/core';
import {User} from '../../../_models';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../_services/admin.service';
import {AlertService} from '../../../_services';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    router: Router;
    user: User;
    private returnUrl: string;

    constructor(
        private adminService: AdminService,
        private alert: AlertService,
        private route: ActivatedRoute,
        router: Router
    ) {
        this.router = router;
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin-panel/users';
        this.adminService.getUser(this.route.snapshot.params.id).subscribe(
            (user: User) => {
                this.user = user;
            },
            err => {
                this.alert.error(err, true);
                this.router.navigate([this.returnUrl]);
            });
    }

    confirmDelete() {
        if (confirm(`Are you sure you want to **delete** the user 
                        \n- ID: ${{this: this.user.id}}
                        \n- Username: ${{this: this.user.username}}?`)) {
            this.onDelete();
        }
    }

    onDelete() {
        this.adminService.deleteUser(this.user.id).subscribe(() => {
            this.router.navigate([this.returnUrl]);
        });
    }

}
