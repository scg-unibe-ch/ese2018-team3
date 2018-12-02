import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {sha256} from 'js-sha256';

import {AlertService, UserService} from '../_services';
import {invalid} from '@angular/compiler/src/render3/view/util';

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

    loading = false;
    submitted = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.userService.currentUserValue) {
            this.router.navigate(['/home']);
        }
    }

    ngOnInit(): void {
    }

    // helper method
    private get(id: string) {
        return (<HTMLInputElement>document.getElementById(id));
    }

    onSubmit() {
        this.submitted = true;

        if (this.invalidForm()) return;

        this.loading = true;

        let user = {
            'username': this.get('username').value,
            'email': this.get('email').value,
            'company': this.get('company').value,
            'password': sha256(this.get('password').value)
        };

        this.userService.register(user).subscribe(
            newUser => {
                console.log('register\t' + 'Successfully registered \'' + user.username + '\'');
                this.alertService.success('Registration successful. Please wait for your account to be approved.', true);
                this.router.navigate(['/home']);
            },
            error => {
                if (status === '405') {
                    console.log('register\t' + 'Failed registering \'' + user.username + '\'');
                    this.alertService.error('Registration unsuccessful. Please choose another username.');
                } else {
                    console.log('register\t' + 'error \'' + error + '\'');
                    this.alertService.error(error);
                }
                this.loading = false;
            });
    }

    private invalidForm(): boolean {
        return this.invalidUsername()
            || this.invalidEmail()
            || this.invalidCompany()
            || this.invalidPassword()
            || this.invalidPasswordMatch();
    }

    invalidUsername(): boolean {
        return this.get('username').value.length === 0;
    }

    invalidEmail(): boolean {
        return this.get('email').value.length === 0;
    }

    invalidCompany(): boolean {
        return this.get('company').value.length === 0;
    }

    invalidPassword(): boolean {
        return this.get('password').value.length === 0;
    }

    invalidPasswordMatch(): boolean {
        return this.get('password2').value !== this.get('password').value;
    }

}
