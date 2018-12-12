import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../_services/theme.service';
import { JobService, AlertService, UserService } from 'src/app/_services';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/_models';
import { Location } from '@angular/common';

@Component({
    selector: 'app-user-job-editor',
    templateUrl: './user-job-editor.component.html',
    styleUrls: ['./user-job-editor.component.css']
})
export class UserJobEditorComponent implements OnInit {

  
  job: Job;
  loading = false;
  submitted = false;
  
  constructor(
    private jService: JobService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private location: Location,
    private themeService: ThemeService
    ) {
    }

    ngOnInit() {
        if (this.themeService.getIsNight() == 'true') {
            this.themeService.changeDesignToNightTheme();
        }
        this.jService.getById(this.route.snapshot.params.id).subscribe(
            (job: Job) => {
                if (!job) this.alert.error('Backend error');
                this.job = job;
                this.onReset();
            },
            err => {
                this.alert.error(err, true);
            });
        this.onReset();
    }

    onSubmit() {
        this.submitted = true;

        if (this.invalidForm()) return;

        this.loading = true;

        this.job.title = this.get('title').value;
        this.job.description = this.get('description').value;
        this.job.updatedAt = new Date();
        this.job.endDate = this.get('endDate').valueAsDate;
        this.job.start = this.get('start').valueAsDate;
        this.job.occupation = this.get('occupation').value;
        this.job.qualifications = this.get('qualifications').value;
        this.job.remarks = this.get('remarks').value;
        this.job.salary = this.get('salary').value;

        this.job.contact = this.get('contact').value;

        this.job.hasChanged = true;

        this.jService.update(this.job).subscribe(
            () => {
                console.log('successfully updated');
                this.alert.success('Successfully updated job.');
                this.loading = false;
            },
            error => {
                this.alert.error(error);
                this.loading = false;
            }
        )
    }

    onReset() {
        this.get('title').value = this.job.title;
        this.get('description').value = this.job.description;
        this.get('updatedAt').valueAsDate = new Date(this.job.updatedAt);
        this.get('endDate').valueAsDate = new Date(this.job.endDate);
        this.get('start').valueAsDate = new Date(this.job.start);
        this.get('occupation').value = this.job.occupation;
        this.get('qualifications').value = this.job.qualifications;
        this.get('remarks').value = this.job.remarks;
        this.get('salary').value = this.job.salary;
        this.get('contact').value = this.job.contact;
    }

    onDelete() {
        if (confirm('Are you really sure you want to delete this job?')) {
            this.jService.delete(this.job.id)
                .subscribe(() => {
                        this.alert.success('Successfully deleted job', true);
                        this.goBack();
                    },
                    err => {
                        this.alert.error(err);
                    });
        }
    }

    goBack(): void {
        this.location.back();
    }

    // helper method
    private get(id: string) {
        return (<HTMLInputElement>document.getElementById(id));
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

    private invalidForm(): boolean {
        return this.invalidTitle()
            || this.invalidDescription()
            || this.invalidStart()
            || this.invalidOccupation()
            || this.invalidQualifications()
            || this.invalidContact();
    }

}
