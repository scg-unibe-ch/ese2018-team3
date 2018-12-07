import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AdminService, AlertService, UserService} from '../_services';


/**
 * he auth guard is used to prevent unauthenticated users from accessing restricted routes,
 * in this example it's used in app.routing.ts to protect the home page route.
 * For more information about angular 2+ route guards you can check out this post on the thoughtram blog.
 *
 * NOTE: While technically it's possible to bypass this client side authentication check by manually adding
 * a 'currentUser' object to local storage using browser dev tools, this would only give access to
 * the client side routes/components, it wouldn't give access to any real secure data from the server api
 * because a valid authentication token (JWT) is required for this.
 */
@Injectable({providedIn: 'root'})
export class AdminAuthGuard implements CanActivate {

    constructor(
        private alert: AlertService,
        private router: Router,
        private adminService: AdminService,
        private userService: UserService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isAdmin = this.adminService.isAdminValue;
        if (isAdmin) return true;

        // not admin in so force logout
        this.userService.clearLogin();
        this.alert.error('Failed to authenticate as admin', true);
        this.router.navigate(['/login']);
        return false;
    }
}