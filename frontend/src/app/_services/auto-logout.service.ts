import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {UserService} from './user.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';


const KEY_WORD = 'lastAction';
const AUTO_LOGOUT = 5; //min

@Injectable()
export class AutoLogoutService implements HttpInterceptor {

    loggedIn: string;

    constructor(
        private alert: AlertService,
        private userService: UserService
    ) {
        this.userService.currentUser.subscribe(x => this.loggedIn = x);
        this.check();
        this.initListener();
    }

    get lastAction() {
        return parseInt(localStorage.getItem(KEY_WORD));
    }

    set lastAction(value) {
        localStorage.setItem(KEY_WORD, value.toString());
    }

    initListener() {
        document.body.addEventListener('click', () => this.reset());
    }

    reset() {
        this.lastAction = Date.now();
    }

    check() {
        const now = Date.now();
        const timeleft = this.lastAction + AUTO_LOGOUT * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
        return isTimeout && this.loggedIn;

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.check()) {
            this.userService.logout();
            this.alert.error(`Automatic logout after ${AUTO_LOGOUT} minutes of inactivity.`);
            return throwError(null);
        }
        return next.handle(req);
    }
}