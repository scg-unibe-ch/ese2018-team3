import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Job} from '../_models';
import {JobService} from '../_services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  loading = false;
  searchTerm: string;
  jobs: Job[];
  static searchText = '';


  constructor(
    private httpClient: HttpClient,
    private jobService: JobService
  ) {
  }

  ngOnInit() {
    SearchComponent.searchText = window.location.pathname.substr(5);
  }

  shortenDescription(job: Job) {
    const length = Math.min(job.description.length - 1, 100);
    let desc = job.description.substr(0, length);
    if (job.description.length > 100) desc += '...';
    return desc;
  }

  onSearch() {
    //if (this.invalidForm()) return;
    //this.loading = true;
    this.jobService.searchJobs(this.get('searchTerm').value).subscribe(
      (jobs: Job[]) => {
        this.jobs = jobs;
      }
    );
    console.log(this.jobs[0]);
    this.loadSearchResults();
  }


  private loadSearchResults() {
    this.jobService.searchJobs(this.get('searchTerm').value).subscribe(jobs => {
      this.jobs = jobs;
    })
  }

  private get(id: string) {
    return (<HTMLInputElement>document.getElementById(id));
  }

 /* private invalidForm(): boolean {
    return this.invalidSearchTerm();
  }*/

  /*invalidSearchTerm(): boolean {
    const search = this.get('searchTerm').value;
    const s = search.trim();
    return search.length == 0 || s.length == 0;
  }*/


}
