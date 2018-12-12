import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../_services';
import {Job} from '../../../_models';
import {Location} from '@angular/common';
import {ThemeService} from '../../../_services/theme.service';

@Component({
    selector: 'app-jobs-changed',
    templateUrl: './jobs-changed.component.html',
    styleUrls: ['./jobs-changed.component.css']
})
export class JobsChangedComponent implements OnInit {

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
        const length = Math.min(job.description.length - 1, 100);
        let desc = job.description.substr(0, length);
        if (job.description.length > 100) desc += '...';
        return desc;
    }

    private loadAllJobs() {
        this.adminService.getAllChangedJobs().subscribe(jobs => this.jobs = jobs);
    }

    goBack(): void {
        this.location.back();
    }
}
