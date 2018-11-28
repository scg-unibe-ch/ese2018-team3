import {Component, OnInit} from '@angular/core';
import {Job} from '../_models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../_services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-job-item',
    templateUrl: './job-editor.component.html',
    styleUrls: ['./job-editor.component.css']
})
export class JobEditorComponent implements OnInit {

    baseUrl;

    private jobsUrl = 'http://localhost:3000//jobs/';

    registerForm: FormGroup;
    returnUrl: string;
    job: Job;

    submitted = false;
    loading = false;

    constructor(
        private alert: AlertService,
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.baseUrl = environment.baseUrl;
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            endDate: [''],
            description: ['', Validators.required],
            qualifications: ['', Validators.required],
        });

        // get return url from route parameters or default to '/home'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    onSave() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) return;

        this.loading = true;

        this.httpClient.put(this.jobsUrl + this.job.id, {
            'name': this.f.name.value,
            'endDate': this.f.endDate.value,
            'description': this.f.description.value,
            'qualifications': this.f.qualifications.value
        }).subscribe(
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
        this.httpClient.delete(this.baseUrl + '/jobitem/' + this.job.id).subscribe(() => {
            this.alert.success(`Successfully deleted job with ID ${this.job.id}`, true);
            this.router.navigate([this.returnUrl]);
        });
    }
}
