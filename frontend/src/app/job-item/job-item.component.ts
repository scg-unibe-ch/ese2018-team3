import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobItem} from '../job-item';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
	selector: 'app-job-item',
	templateUrl: './job-item.component.html',
	styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {

  baseUrl;

	@Input()
	jobItem: JobItem;
	@Output()
	destroy = new EventEmitter<JobItem>();

	constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
	}

	ngOnInit() {
	}

	onSave() {
		this.httpClient.put(this.baseUrl + '/jobitem/' + this.jobItem.id, {
			'name': this.jobItem.name,
			'jobListId': this.jobItem.jobListId,
			'createdAt': this.jobItem.createdAt,
			'endDate': this.jobItem.endDate,
			'description': this.jobItem.description,
			'qualifications': this.jobItem.qualifications
		}).subscribe();
	}

	onDestroy() {
		this.httpClient.delete(this.baseUrl + '/jobitem/' + this.jobItem.id).subscribe(() => {
			this.destroy.emit(this.jobItem);
		});
	}
}
