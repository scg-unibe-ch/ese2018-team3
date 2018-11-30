import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {sha256} from 'js-sha256';

import {AlertService, UserService} from '../_services';

/**
 * The register component vreates a new user with the user service when the register form is submitted.
 * If the user is alredy logged in they are automatically redirected to the home page.
 *
 * The userEditForm: FormGroup object defines the form controls and validators, and is used to access data entered
 * into the form. The FormGroup is part of the Angular Reactive Forms module and is bound to the login template
 * above with the [formGroup]="userEditForm" directive.
 */
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        if (this.userService.currentUserValue) {
            this.router.navigate(['/home']);
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            company: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) return;

        this.loading = true;
        let user = {
            'company': this.f.company.value,
            'email': this.f.email.value,
            'username': this.f.username.value,
            'password': sha256(this.f.password.value)
        };

        this.userService.register(user).subscribe(
            () => {
                // check for failed registration
                if (status === '405') {
                    console.log('register\t' + 'Failed registering \'' + user.username + '\'');
                    this.alertService.error('Registration unsuccessful. Please choose another username.');
                    this.loading = false;
                } else {
                    console.log('register\t' + 'Successfully registered \'' + user.username + '\'');
                    this.alertService.success('Registration successful. Please wait for your account to be approved.', true);
                    this.router.navigate(['/home']);
                }
            },
            error => {
                console.log('register\t' + 'error \'' + error + '\'');
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
