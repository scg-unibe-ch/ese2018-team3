import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobItem} from '../job-item';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {

  @Input()
  jobItem: JobItem;
  @Output()
  destroy = new EventEmitter<JobItem>();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  onSave() {
    this.httpClient.put('http://localhost:3000/jobitem/' + this.jobItem.id, {
      'name': this.jobItem.name,
      'jobListId': this.jobItem.jobListId,
      'done': this.jobItem.done
    }).subscribe();
  }

  onDestroy() {
    this.httpClient.delete('http://localhost:3000/jobitem/' + this.jobItem.id).subscribe(() => {
      this.destroy.emit(this.jobItem);
    });
  }

}
