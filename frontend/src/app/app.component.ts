import {Component, OnInit} from '@angular/core';
import {JobList} from './job-list';
import {JobItem} from './job-item';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Job For You';
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
