import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, JobService} from '../../_services';
import {Location} from '@angular/common';
import {ThemeService} from '../../_services/theme.service';

@Component({
    selector: 'app-job-creator',
    templateUrl: './job-creator.component.html',
    styleUrls: ['./job-creator.component.css']
})
export class JobCreatorComponent implements OnInit {

    loading = false;
    submitted = false;

    constructor(
        private router: Router,
        private jobService: JobService,
        private alert: AlertService,
        private themeService: ThemeService
    ) {
    }

    ngOnInit() {
      if (this.themeService.getIsNight() == 'true'){
        this.themeService.changeDesignToNightTheme();
      }
    }

    onSubmit() {
        this.submitted = true;

        if (this.invalidForm()) return;

        this.loading = true;
        let job = {
            'title': (<HTMLInputElement>document.getElementById('title')).value,
            'description': (<HTMLInputElement>document.getElementById('description')).value,
            'start': (<HTMLInputElement>document.getElementById('start')).value,
            'endDate': (<HTMLInputElement>document.getElementById('endDate')).value,
            'occupation': (<HTMLInputElement>document.getElementById('occupation')).value,
            'qualifications': (<HTMLInputElement>document.getElementById('qualifications')).value,
            'remarks': (<HTMLInputElement>document.getElementById('remarks')).value,
            'salary': (<HTMLInputElement>document.getElementById('salary')).value,
            'contact': (<HTMLInputElement>document.getElementById('contact')).value,
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

    invalidTitle(): boolean {
        return this.get('title').value.length === 0;
    }

    invalidDescription(): boolean {
        return this.get('description').value.length === 0;
    }

    invalidStart(): boolean {
        return this.get('start').valueAsDate === null;
    }

    invalidOccupation(): boolean {
        return this.get('occupation').value.length === 0;
    }

    invalidQualifications(): boolean {
        return this.get('qualifications').value.length === 0;
    }

    invalidContact(): boolean {
        return this.get('contact').value.length === 0;
    }

    // helper method
    private get(id: string) {
        return (<HTMLInputElement>document.getElementById(id));
    }

    private invalidForm(): boolean {
        return this.invalidTitle()
            || this.invalidDescription()
            || this.invalidStart()
            || this.invalidOccupation()
            || this.invalidQualifications()
            || this.invalidContact();
    }
}
