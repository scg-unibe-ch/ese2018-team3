import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {JobService, AlertService} from '../../_services';

@Component({
  selector: 'app-job-creator',
  templateUrl: './job-creator.component.html',
  styleUrls: ['./job-creator.component.css']
})
export class JobCreatorComponent implements OnInit {
  
	jobForm: FormGroup;
	loading = false;
	saving = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private jobService: JobService,
		private alert: AlertService
	) { }

	get f() {
		return this.jobForm.controls;
	}

	ngOnInit() {
		this.jobForm = this.formBuilder.group({
			name: ['', Validators.required],
			endDate: ['', Validators.required],
			description: ['', Validators.required],
            qualifications: ['', Validators.required]
		})
	}

	onSubmit() {
		this.saving = true;

		if(this.jobForm.invalid) return;

		this.loading = true;
		let job = {
            'name': this.f.name.value,
            'endDate': this.f.endDate.value,
            'description': this.f.description.value,
			'qualifications': this.f.qualifications.value
        };
		
		this.jobService.save(job).subscribe(
			() => {
				console.log('Couldn\'t save job.')
				this.alert.success('Saved successfully.', true);
				this.router.navigate(['/jobs']);
			},
			error => {
				console.log('Saving error:\t\'' + error + '\'')
				this.alert.error(error);
				this.loading = false;
			}
		)
	}

  

}
