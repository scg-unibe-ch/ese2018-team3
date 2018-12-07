import {Component, OnInit} from '@angular/core';
import {Job} from 'src/app/_models';
import {AdminService} from 'src/app/_services';
import {Location} from '@angular/common';

@Component({
    selector: 'app-admin-jobs',
    templateUrl: './admin-jobs.component.html',
    styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

    jobs: Job[];

    constructor(
        private adminService: AdminService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.jobs = [];
        this.loadAllJobs()
    }

    goBack(): void {
        this.location.back();
    }

    shortenDescription(job: Job) {
        const length = Math.min(job.description.length - 1, 25);
        let d = job.description.substr(0, length);
        if (job.description.length > 25) d += '...';
        return d;
    }

    private loadAllJobs() {
        this.adminService.getAllJobs().subscribe(jobs => {
            this.jobs = jobs;
        });
    }
}
