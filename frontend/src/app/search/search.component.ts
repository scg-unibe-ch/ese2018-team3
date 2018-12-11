import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Job} from '../_models';
import {JobService} from '../_services';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  jobs: Job[];
  static searchText = '';


  constructor(
    private httpClient: HttpClient,
    private jobService: JobService
  ) {

  }

  ngOnInit() {
    this.jobs = [];
   // this.loadAllJobs();
    SearchComponent.searchText = window.location.pathname.substr(5);
    //this.httpClient.get('http://localhost:3000/job').subscribe((instances: any) => {
      //this.jobs = instances.map(this.filter);
  }

  shortenDescription(job: Job) {
    const length = Math.min(job.description.length - 1, 100);
    let desc = job.description.substr(0, length);
    if (job.description.length > 100) desc += '...';
    return desc;
  }

  /*ngOnInit() {
    SearchComponent.searchText = window.location.pathname.substr(8);
    this.httpClient.get('http://localhost:3000/job').subscribe((instances: any) => {
      this.jobs = instances.map(this.filter);
    });
  }*/

  filter(job: any): Job {
    if (SearchComponent.containsText(job)) {
      return job;
    }
    else return null;
  }

  private static containsText(job: any): boolean {
    return job.name.includes(this.searchText);
  }

/*  private loadAllJobs() {
    this.jobService.getAll().subscribe(jobs => {
      this.jobs = jobs;
    })
  }*/
}
