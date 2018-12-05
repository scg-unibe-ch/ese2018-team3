




import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/_models';
import { AdminService, AlertService } from 'src/app/_services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-job-editor',
  templateUrl: './admin-job-editor.component.html',
  styleUrls: ['./admin-job-editor.component.css']
})
export class AdminJobEditorComponent implements OnInit {

  job: Job;
  loading = false;
  submitted = false;

  constructor(
    private aService: AdminService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private location: Location
  ) { }

  ngOnInit() {
    this.aService.getJobById(this.route.snapshot.params.id).subscribe(
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

    //if (this.invalidForm()) return;

    this.loading = true;

    this.job.name = this.getElementById('title').value;
    this.job.description = this.getElementById('description').value;
    this.job.endDate = this.getElementById('endDate').valueAsDate;
    this.job.isApproved = this.getElementById('isApproved').checked;
    this.job.contact = this.getElementById('contact').value
    this.job.qualifications = this.getElementById('qualifications').value;

    this.aService.updateJob(this.job).subscribe(
        (job: any) => {
            this.alert.success('Successfully updated job.');
            this.loading = false;
        },
        error => {
            this.alert.error(error);
            this.loading = false;
        }
    )
}

  // helper method
  private getElementById(id: string) {
    return (<HTMLInputElement>document.getElementById(id));
  }

  onReset() {
    this.getElementById('title').value = this.job.name;
    this.getElementById('endDate').valueAsDate = this.job.endDate;
    this.getElementById('description').value = this.job.description;
    this.getElementById('isApproved').checked = this.job.isApproved;
    this.getElementById('qualifications').value = this.job.qualifications;
    this.getElementById('contact').value = this.job.contact;
  }

  onDelete() {
    if (confirm('Are you really sure you want to delete this job?')) {
        this.aService.deleteJob(this.job.id)
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
}
