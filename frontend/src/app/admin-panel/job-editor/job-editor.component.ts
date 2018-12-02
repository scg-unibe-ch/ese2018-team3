import {Component, OnInit} from '@angular/core';
import {Job} from '../../_models';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService, JobService} from '../../_services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-job-item',
    templateUrl: './job-editor.component.html',
    styleUrls: ['./job-editor.component.css']
})
export class JobEditorComponent implements OnInit {

    baseUrl;
    jobEditForm: FormGroup;
    returnUrl: string;
    job: Job;
    submitted = false;
    loading = false;
    private jobsUrl = 'http://localhost:3000//jobs/';

    constructor(
        private alert: AlertService,
        private formBuilder: FormBuilder,
        private jobService: JobService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.baseUrl = environment.baseUrl;
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.jobEditForm.controls;
    }

    ngOnInit() {
        if (!this.job) this.jobService.getById(this.route.snapshot.params.id).subscribe(
            (job: Job) => {
                if (!job) this.alert.error('Backend error');
                this.job = job;
            },
            err => {
                this.alert.error(err, true);
            });

        this.jobEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            endDate: [''],
            description: ['', Validators.required],
            qualifications: ['', Validators.required],
        });

        // get return url from route parameters or default to '/home'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.jobEditForm.invalid) return;

        this.loading = true;

        this.jobService.save(this.job).subscribe(
            () => {
                this.alert.success('Successfully updated');
            },
            err => {
                this.alert.error(err);
                this.loading = false;
            });
    }

    confirmDelete() {
        if (confirm('Are you sure you want to delete this job posting?')) this.onDelete();
    }

    onDelete() {
        confirm('Not implemented right now');
    }

    onReset() {
        this.jobEditForm.reset({
            name: this.job.name,
            endDate: this.job.endDate,
            description: this.job.description,
            qualifications: this.job.qualifications
        });
    }
}
