import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from 'src/app/_models';
import {AlertService, JobService} from 'src/app/_services';

@Component({
    selector: 'app-job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

    job: Job;
    private returnUrl: string;

    constructor(
        private jobService: JobService,
        private alert: AlertService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {
    }

    ngOnInit() {
        console.log(this.route.snapshot.params.id);
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/jobs';
        this.jobService.getById(this.route.snapshot.params.id).subscribe(
            (job: Job) => {
                this.job = job;
            },
            err => {
                this.alert.error(err, true);
                this.router.navigate([this.returnUrl]);
            });
    }

    goBack(): void {
        this.location.back();
    }
}
