import {Component, OnInit} from '@angular/core';
import {JobList} from './job-list';
import {JobItem} from './job-item';
import {HttpClient} from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	jobList: JobList = new JobList(null, '');
	jobLists: JobList[] = [];

	constructor(private httpClient: HttpClient) {

	}

	ngOnInit() {
		this.httpClient.get('http://localhost:3000/joblist').subscribe((instances: any) => {
			this.jobLists = instances.map((instance) => new JobList(instance.id, instance.name));
		});
	}

	onJobListCreate() {
		this.httpClient.post('http://localhost:3000/joblist', {
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
