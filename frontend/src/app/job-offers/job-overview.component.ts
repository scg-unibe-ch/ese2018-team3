import {Component, OnInit} from '@angular/core';
import {Job} from '../_models';
import {JobService} from '../_services';

@Component({
    selector: 'app-job-overview',
    templateUrl: './job-overview.component.html',
    styleUrls: ['./job-overview.component.css']
})
export class JobOverviewComponent implements OnInit {

    jobs: Job[];

    constructor(
        private jobService: JobService
    ) {
    }

    ngOnInit() {
        this.jobs = [];
        this.loadAllJobs();
    }

    shortenDescription(job: Job) {
        const length = Math.min(job.description.length - 1, 100);
        let desc = job.description.substr(0, length);
        if (job.description.length > 100) desc += '...';
        return desc;
    }

    private loadAllJobs() {
        this.jobService.getAll().subscribe(jobs => {
            this.jobs = jobs;
        })
    }
}
