import {Component, OnInit} from '@angular/core';
import {JobItem} from '../_models';

@Component({
    selector: 'app-job-display',
    templateUrl: './job-display.component.html',
    styleUrls: ['./job-display.component.css']
})
export class JobDisplayComponent implements OnInit {

    job: JobItem;

    constructor() {
    }

    ngOnInit() {
    }

}
