import {Component, OnInit} from '@angular/core';
import {Job} from '../../../_models';
import {AdminService} from '../../../_services';
import {Location} from '@angular/common';

@Component({
    selector: 'app-jobs-unapproved',
    templateUrl: './jobs-unapproved.component.html',
    styleUrls: ['./jobs-unapproved.component.css']
})
export class JobsUnapprovedComponent implements OnInit {

    jobs: Job[];

    constructor(
        private adminService: AdminService,
        private location: Location
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
        this.adminService.getAllUnapprovedJobs().subscribe(jobs => this.jobs = jobs);
    }

    goBack(): void {
        this.location.back();
    }
}
