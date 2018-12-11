import {Component, OnInit} from '@angular/core';
import {Job} from '../_models';
import {JobService} from '../_services';
import {Location} from '@angular/common';
import {ThemeService} from '../_services/theme.service';

@Component({
    selector: 'app-job-offers',
    templateUrl: './job-offers.component.html',
    styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {

    jobs: Job[];

    constructor(
        private jobService: JobService,
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
        this.jobService.getAll().subscribe(jobs => {
            this.jobs = jobs;
        })
    }
}
