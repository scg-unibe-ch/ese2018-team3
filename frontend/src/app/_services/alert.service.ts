import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';


/**
 * The alert service enables any component in the application to display alert messages at the top of the page
 * via the alert component.
 *
 * It has methods for displaying success and error messages, and a getMessage() method that returns an Observable
 * that is used by the alert component to subscribe to notifications for whenever a message should be displayed.
 */
@Injectable({providedIn: 'root'})
export class AlertService {

    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.clear();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({type: 'success', text: message});
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({type: 'error', text: message});
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    clear(): void {
        this.subject.next();
    }
}