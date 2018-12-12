import {Component, OnInit} from '@angular/core';
import {Job} from '../../_models';
import {JobService} from '../../_services';
import {Location} from '@angular/common';
import {ThemeService} from '../../_services/theme.service';

@Component({
    selector: 'app-my-jobs',
    templateUrl: './my-jobs-panel.component.html',
    styleUrls: ['./my-jobs-panel.component.css']
})
export class MyJobsPanelComponent implements OnInit {

    jobs: Job[];

    constructor(
        private jobService: JobService,
        private themeService: ThemeService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.jobs = [];
        this.loadMyJobs();
        if (this.themeService.getIsNight() == 'true'){
          this.themeService.changeDesignToNightTheme();
        }
    }

    shortenDescription(job: Job) {
        const length = Math.min(job.description.length - 1, 100);
        return job.description.substr(0, length);
    }

    private loadMyJobs() {
        //TODO Actually Show Jobs, It seems to be not getting the jobs correctly via job.serve.ts
        // Above To-Do inserted by Brian
        this.jobService.getFromCurrentUser().subscribe(jobs => {
            this.jobs = jobs;
        })
    }

    goBack() {
      this.location.back();
    }

}
