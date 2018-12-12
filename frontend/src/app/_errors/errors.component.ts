import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

    constructor(
        private location: Location
    ) {
    }

    ngOnInit() {
    }

    goBack(): void {
        this.location.back();
    }
}
