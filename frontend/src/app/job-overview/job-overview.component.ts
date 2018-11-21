import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

import {HttpClient} from '@angular/common/http';
import {JobItem} from '../_models';

@Component({
    selector: 'app-job-overview',
    templateUrl: './job-overview.component.html',
    styleUrls: ['./job-overview.component.css']
})
export class JobOverviewComponent implements OnInit {
    baseUrl = environment.baseUrl;

    jobs: JobItem[];

    constructor(private httpClient: HttpClient) {
        // this.baseUrl = environment.baseUrl;
    }

    ngOnInit() {
        this.httpClient.get(this.baseUrl + '/jobs').subscribe((instances: any) => {
            this.jobs = instances;
        });
    }
}
