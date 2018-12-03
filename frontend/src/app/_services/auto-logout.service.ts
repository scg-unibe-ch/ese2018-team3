import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {UserService} from './user.service';


const KEY_WORD = 'lastAction';
const CHECK_INTERVAL = 1000; // ms
const AUTO_LOGOUT = 20; //min

@Injectable({providedIn: 'root'})
export class AutoLogoutService {

    loggedIn: string;

    get lastAction() {
        return parseInt(localStorage.get(KEY_WORD));
    }

    set lastAction(value) {
        localStorage.setItem(KEY_WORD, value.toString());
    }

    constructor(
        private alert: AlertService,
        private userService: UserService
    ) {
        this.userService.currentUser.subscribe(x => this.loggedIn = x);
        this.check();
        this.initListener();
        this.initInterval();
    }

    initListener() {
        document.body.addEventListener('click', () => this.reset());
    }

    reset() {
        this.lastAction = Date.now();
    }

    initInterval() {
        setInterval(() => {
            this.check();
        }, CHECK_INTERVAL);
    }

    check() {
        const now = Date.now();
        const timeleft = this.lastAction + AUTO_LOGOUT * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;

        if (isTimeout && this.loggedIn) {
            this.userService.logout();
            this.alert.error(`Automatic logout after ${AUTO_LOGOUT} minutes of inactivity.`);
        }
    }
}