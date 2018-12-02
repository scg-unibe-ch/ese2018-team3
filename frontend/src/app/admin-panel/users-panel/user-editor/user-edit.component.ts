import {Component, OnInit} from '@angular/core';
import {AdminService, AlertService} from '../../../_services';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../../../_models';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    user: User;
    loading = false;
    submitted = false;

    constructor(
        private adminService: AdminService,
        private route: ActivatedRoute,
        private alert: AlertService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.adminService.getUser(this.route.snapshot.params.id).subscribe(
            (user: User) => {
                if (!user) this.alert.error('Backend error');
                this.user = user;

                this.onReset();
            },
            err => {
                this.alert.error(err, true);
            });
    }

    // helper method
    private getElementById(id: string) {
        return (<HTMLInputElement>document.getElementById(id));
    }

    onSubmit() {
        this.submitted = true;

        if (this.invalidForm()) return;

        this.loading = true;

        this.user.username = this.getElementById('username').value;
        this.user.email = this.getElementById('email').value;
        this.user.company = this.getElementById('company').value;
        this.user.isApproved = this.getElementById('isApproved').checked;

        this.adminService.updateUser(this.user).subscribe(
            (user: any) => {
                this.alert.success('Successfully updated user.');
                this.loading = false;
            },
            error => {
                this.alert.error(error);
                this.loading = false;
            }
        )
    }

    onReset() {
        this.getElementById('username').value = this.user.username;
        this.getElementById('email').value = this.user.email;
        this.getElementById('company').value = this.user.company;
        this.getElementById('isApproved').checked = this.user.isApproved;
    }

    onDelete() {
        if (confirm('Are you really sure to delete this user?')) {
            this.adminService.deleteUser(this.user.id)
                .subscribe(() => {
                    this.alert.success('Successfully deleted user', true);
                    this.goBack();
                },
                err => {
                    this.alert.error(err);
                });
        }
    }

    goBack(): void {
        this.location.back();
    }

    private invalidForm(): boolean {
        return this.invalidUsername() || this.invalidEmail() || this.invalidCompany();
    }

    invalidUsername(): boolean {
        return this.getElementById('username').value.length === 0;
    }

    invalidEmail(): boolean {
        return this.getElementById('email').value.length === 0;
    }

    invalidCompany(): boolean {
        return this.getElementById('company').value.length === 0;
    }
}
