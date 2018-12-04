import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/_models';
import { AdminService } from 'src/app/_services';
import { Location } from '@angular/common';

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

    private loadAllJobs() {
        this.adminService.getAllJobs().subscribe(jobs => {
            this.jobs = jobs;
        });
    }

}
