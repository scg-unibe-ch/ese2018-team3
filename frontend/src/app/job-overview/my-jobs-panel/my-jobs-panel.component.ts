import {Component, OnInit} from '@angular/core';
import {Job} from '../../_models';
import {JobService} from '../../_services';

@Component({
    selector: 'app-my-jobs',
    templateUrl: './my-jobs-panel.component.html',
    styleUrls: ['./my-jobs-panel.component.css']
})
export class MyJobsPanelComponent implements OnInit {

    jobs: Job[];

    constructor(
        private jobService: JobService
    ) {
    }

    ngOnInit() {
        this.jobs = [];
        this.loadMyJobs();
    }

    private loadMyJobs() {
        this.jobService.getFromCurrentUser().subscribe(jobs => {
            this.jobs = jobs;
        })
    }

    shortenDescription(job: Job) {
        const length = Math.min(job.description.length - 1, 100);
        return job.description.substr(0, length);
    }

}
