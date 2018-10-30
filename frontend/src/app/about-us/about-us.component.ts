/*
import { Component, OnInit } from '@angular/core';
import {Job} from '../job';
import {HttpClient} from '@angular/common/http';
import {JobService} from '../job.service';
import {UserService} from '../user.service';
import {User} from '../user';

/!*
TEMPORARLY ADDED THIS HERE FOR THE EXERCISE
*!/

@Component({
  selector: 'app-ueber-uns',
  templateUrl: './ueber-uns.component.html',
  styleUrls: ['./ueber-uns.component.css']
})
export class UeberUnsComponent implements OnInit {
  jobs: Job[] = [];
  job: Job = new Job(null, '', '', '', '','','', 0, false,'', '', 0, false);
  user: User;
  constructor(private httpClient: HttpClient, private userService: UserService) {
  }


  ngOnInit() {
    JobService.getAllJobs().subscribe((instances: any) => {
      this.jobs = instances.map((instance) =>  new Job(instance.id, instance.name, instance.description_short, instance.description, instance.company_id, instance.company_email, instance.job_website,
        instance.wage, instance.wagePerHour, instance.job_start, instance.job_end, instance.percentage, instance.approved));
    });
    this.userService.currentUser.subscribe(currentUser => this.user = currentUser);
  }

  onCreateJob() {
    if (this.job.name) {
      JobService.createJob(this.job, this.user).subscribe((instance: any) => {
        this.job.id = instance.id;
        this.jobs.push(this.job);
        this.job = new Job(null, '', '', '', '', '', '', 0, false, '', '', 0, false);
      });
    }
  }

  onDeleteJob(job: Job) {
    /!*JobService.deleteJob(job).subscribe((instance) =>{
    });*!/
    this.jobs.splice(this.jobs.indexOf(job), 1);
  }*/
