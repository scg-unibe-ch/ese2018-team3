import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobList} from '../job-list';
import {JobItem} from '../job-item';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
	selector: 'app-job-list',
	templateUrl: './job-list.component.html',
	styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
	
	baseUrl;

	@Input()
	jobList: JobList;
	jobItem: JobItem = new JobItem(null, null, '', new Date(), null, '', null);
	jobItems: JobItem[] = [];
	@Output()
	destroy = new EventEmitter<JobList>();

	constructor(private httpClient: HttpClient) {
		this.baseUrl = environment.baseUrl;

	}

	ngOnInit() {
		this.httpClient.get(this.baseUrl + '/jobitem', {
			params:  new HttpParams().set('jobListId', '' + this.jobList.id)
		}).subscribe((instances: any) => {
			this.jobItems = instances.map((instance) => new JobItem(instance.id, instance.jobListId, instance.name, instance.createdAt, instance.endDate, instance.description, instance.qualifications));
		});
	}

	onSave() {
		this.httpClient.put(this.baseUrl + '/joblist/' + this.jobList.id, {
			'name': this.jobList.name
		}).subscribe();
	}

	onDestroy() {
		this.httpClient.delete(this.baseUrl + '/joblist/' + this.jobList.id).subscribe(() => {
			this.destroy.emit(this.jobList);
		});
	}

	onJobItemCreate() {
		this.jobItem.jobListId = this.jobList.id;
		this.httpClient.post(this.baseUrl + '/jobitem', {
			'jobListId': this.jobItem.jobListId,
			'name': this.jobItem.name,
			'description': this.jobItem.description,
			'createdAt': this.jobItem.createdAt,
			'endDate': this.jobItem.endDate,
			'qualifications': this.jobItem.qualifications
		}).subscribe((instance: any) => {
			this.jobItem.id = instance.id;
			this.jobItems.push(this.jobItem);
			this.jobItem = new JobItem(null, this.jobList.id, '', new Date(), null, '', null);
		});
	}

	onJobItemDestroy(jobItem: JobItem) {
		this.jobItems.splice(this.jobItems.indexOf(jobItem), 1);
	}

}
