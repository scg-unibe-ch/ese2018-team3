import {Component, OnInit} from '@angular/core';
import {Job} from '../../../_models';
import {AdminService} from '../../../_services';
import {Location} from '@angular/common';
import {ThemeService} from '../../../_services/theme.service';

@Component({
    selector: 'app-jobs-unapproved',
    templateUrl: './jobs-unapproved.component.html',
    styleUrls: ['./jobs-unapproved.component.css']
})
export class JobsUnapprovedComponent implements OnInit {

    jobs: Job[];

    constructor(
        private adminService: AdminService,
        private location: Location,
        private themeService: ThemeService
    ) {
    }

    ngOnInit() {
        this.jobs = [];
        this.loadAllJobs();
        if (this.themeService.getIsNight() == 'true'){
          this.themeService.changeDesignToNightTheme();
       }
    }

    shortenDescription(job: Job) {
        const length = Math.min(job.description.length - 1, 50);
        let desc = job.description.substr(0, length);
        if (job.description.length > 50) desc += '...';
        return desc;
    }

    goBack(): void {
        this.location.back();
    }

    private loadAllJobs() {
        this.adminService.getAllUnapprovedJobs().subscribe(jobs => this.jobs = jobs);
    }
}
