import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AlertService, UserService} from '../_services';
import {Router} from '@angular/router';


/**
 * The error Interceptor intercepts http responses from the api to check if there were any _errors.
 * If there is a 401 Unauthorized response the user is automatically logged out of the application,
 * all other _errors are re-thrown up tot he calling service so an an alert can be displayed to the user.
 *
 * Http interceptors are added to the request pipeline in the providers section of the app.module.ts file.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService,
        private alert: AlertService,
        private router: Router
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || 400) {
                this.userService.logout();
                this.router.navigate(['/home']);
                this.alert.error('Unauthorized => Automatic Logout', true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
