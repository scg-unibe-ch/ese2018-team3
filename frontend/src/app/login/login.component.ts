import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertService, UserService} from '../_services';
import {sha256} from 'js-sha256';
import {Location} from '@angular/common';
import {ThemeService} from '../_services/theme.service';


/**
 * The login component uses the authentication service to login to the application. If the user is already logged in
 * they are automatically redirected to the home page.
 *
 * The userEditForm: FormGroup object defines the form controls and validators, and is used to access data entered
 * into the form. The FormGroup is part of the Angular Reactive Forms module and is bound to the login template
 * above with the [formGroup]="userEditForm" directive.
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private themeService: ThemeService
    ) {
        // redirect to home if already logged in
        if (this.userService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        // get return url from route parameters or default to '/home'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        if (this.themeService.getIsNight() == 'true'){
          this.themeService.changeDesignToNightTheme();
        }
    }

    onSubmit() {
        this.submitted = true;

        if (this.invalidForm()) return;

        this.loading = true;

        let user = {
            'username': this.get('username').value,
            'password': sha256(this.get('password').value)
        };

        this.userService.login(user)
            .subscribe(
                (user: any) => {
                    this.userService.save(user);
                    this.alertService.success('Successfully logged in.', true);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    invalidUsername(): boolean {
        return this.get('username').value.length === 0;
    }

    invalidPassword(): boolean {
        return this.get('password').value.length === 0;
    }

    // helper method
    private get(id: string) {
        return (<HTMLInputElement>document.getElementById(id));
    }

    private invalidForm(): boolean {
        return this.invalidUsername()
            || this.invalidPassword();
    }
}
