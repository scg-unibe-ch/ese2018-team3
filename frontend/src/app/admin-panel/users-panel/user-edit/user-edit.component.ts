import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService, AlertService} from '../../../_services';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    user: any;
    userEditForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private route: ActivatedRoute,
        private alert: AlertService
    ) {
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.userEditForm.controls;
    }

    ngOnInit() {
        if (!this.user) this.adminService.getUser(this.route.snapshot.params.id).subscribe(
            user => {
                if (!user) this.alert.error('Backend error');
                this.user = user;
            },
            err => {
                this.alert.error(err, true);
            });

        this.userEditForm = this.formBuilder.group({
            company: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required],
            isApproved: ['']
        });
        this.onReset();
    }

    onSubmit() {
        this.submitted = true;

        if (this.userEditForm.invalid) return;

        this.loading = true;

        this.user.company = this.f.company.value;
        this.user.email = this.f.email.value;
        this.user.username = this.f.username.value;
        this.user.isApproved = this.f.isApproved.value;

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
        this.userEditForm.reset({
            company: this.user.company,
            email: this.user.email,
            username: this.user.username,
            isApproved: this.user.isApproved
        });
    }
}
