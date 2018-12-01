import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, JobService} from '../../_services';

@Component({
    selector: 'app-job-creator',
    templateUrl: './job-creator.component.html',
    styleUrls: ['./job-creator.component.css']
})
export class JobCreatorComponent implements OnInit {

    loading = false;
    saving = false;

    constructor(
        private router: Router,
        private jobService: JobService,
        private alert: AlertService
    ) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.saving = true;

        this.loading = true;
        let job = {
            'name': (<HTMLInputElement>document.getElementById('title')).value,
            'endDate': (<HTMLInputElement>document.getElementById('endDate')).value,
            'occupation': (<HTMLInputElement>document.getElementById('occupation')).value,
            'description': (<HTMLInputElement>document.getElementById('description')).value,
            'qualifications': (<HTMLInputElement>document.getElementById('qualifications')).value,
            'contact': (<HTMLInputElement>document.getElementById('contact')).value
        };

        this.jobService.save(job).subscribe(
            () => {
                console.log('Couldn\'t save job.');
                this.alert.success('Saved successfully.', true);
                this.router.navigate(['/jobs']);
            },
            error => {
                console.log('Saving error:\t\'' + error + '\'');
                this.alert.error(error);
                this.loading = false;
            }
        )
    }
}
