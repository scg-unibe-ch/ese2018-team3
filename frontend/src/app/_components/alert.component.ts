import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {AlertService} from '../_services';


/**
 * The alert component passes alert messages to the template whenever a message is received from the alert service.
 * It does this by subscribing to the alert service's getMessage() method which returns an Observable.
 */
@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {

    alertService: AlertService;
    message: any;
    private subscription: Subscription;

    constructor(alertService: AlertService) {
        this.alertService = alertService;
    }

    ngOnInit(): void {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            this.message = message;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

}
