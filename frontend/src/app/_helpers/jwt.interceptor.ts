import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {UserService} from '../_services';

/**
 * The JWT Interceptor intercepts http requests from the application to add a JWT auth token to the
 * Authorization header if the user is logged in.
 *
 * Http interceptors are added to the request pipeline in the providers section of the app.module.ts file.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor(private userService: UserService) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add authorization header with jwt token if available
		let currentUser = this.userService.currentUserValue;
		if (currentUser) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser.token}`
				}
			});
		}

		return next.handle(request);
	}
}