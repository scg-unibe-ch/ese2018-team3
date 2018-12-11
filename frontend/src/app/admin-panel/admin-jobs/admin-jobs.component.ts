import {Component, OnInit} from '@angular/core';
import {Job} from 'src/app/_models';
import {AdminService} from 'src/app/_services';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ThemeService} from '../../_services/theme.service';

@Component({
    selector: 'app-admin-jobs',
    templateUrl: './admin-jobs.component.html',
    styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

    jobs: Job[] = [];
    user: any;

    constructor(
        private adminService: AdminService,
        private location: Location,
        private route: ActivatedRoute,
        private themeService: ThemeService
    ) {    }

    ngOnInit() {
        this.loadAllJobs();
        if (this.themeService.getIsNight() == 'true'){
          this.themeService.changeDesignToNightTheme();
        }
    }

    goBack(): void {
        this.location.back();
    }

    shortenDescription(job: Job) {
        const length = Math.min(job.description.length - 1, 50);
        let d = job.description.substr(0, length);
        if (job.description.length > 50) d += '...';
        return d;
    }

    loadUser(userId: number) {
        this.adminService.getUser(userId).subscribe(user => {
            this.user = user;
        });
    }

    private loadAllJobs() {
        this.adminService.getAllJobs().subscribe(jobs => {
            this.jobs = jobs;
        });
    }
}
