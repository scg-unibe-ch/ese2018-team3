import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {UserService} from '../_services';


/**
 * The error Interceptor intercepts http responses from the api to check if there were any errors.
 * If there is a 401 Unauthorized response the user is automatically logged out of the application,
 * all other errors are re-thrown up tot he calling service so an an alert can be displayed to the user.
 *
 * Http interceptors are added to the request pipeline in the providers section of the app.module.ts file.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private userService: UserService) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(catchError(err => {
			if (err.status === 401) {
				// auto logout if 401 response returned from api
				this.userService.logout();
				location.reload(true);
			}

			const error = err.error.message || err.statusText;
			return throwError(error);
		}))
	}
}