import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {JobList} from '../job-list';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-job-overview',
  templateUrl: './job-overview.component.html',
  styleUrls: ['./job-overview.component.css']
})
export class JobOverviewComponent implements OnInit {
  baseUrl = environment.baseUrl;

  jobList: JobList = new JobList(null, '');
  jobLists: JobList[] = [];

  constructor(private httpClient: HttpClient) {
    // this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {
    this.httpClient.get(this.baseUrl + '/joblist').subscribe((instances: any) => {
      this.jobLists = instances.map((instance) => new JobList(instance.id, instance.name));
    });
  }

  onJobListCreate() {
    this.httpClient.post(this.baseUrl + '/joblist', {
      'name': this.jobList.name
    }).subscribe((instance: any) => {
      this.jobList.id = instance.id;
      this.jobLists.push(this.jobList);
      this.jobList = new JobList(null, '');
    });
  }

  onJobListDestroy(jobList: JobList) {
    this.jobLists.splice(this.jobLists.indexOf(jobList), 1);
  }

}
