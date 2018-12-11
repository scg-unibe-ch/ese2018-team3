import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Job} from '../../_models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {AlertService, JobService} from '../../_services';
import {sha256} from 'js-sha256';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  loading = false;
  searched = false;
  returnUrl: string;
  searchTerm: string;
  jobsId: Job[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService) {
  }

  onSearch() {
    this.searched = true;
    if (this.invalidForm()) return;
    this.loading = true;
    this.jobService.searchJobs(this.get('searchTerm').value).subscribe(
      (jobs: Job[]) => {
        this.jobsId = jobs;
      }
    );
    console.log(this.jobsId[0]);
  }


  private invalidForm(): boolean {
    return this.invalidSearchTerm();
  }

  invalidSearchTerm(): boolean {
    const search = this.get('searchTerm').value;
    const s = search.trim();
    return search.length == 0 || s.length == 0;
  }
  // helper method
  private get(id: string) {
    return (<HTMLInputElement>document.getElementById(id));
  }
  ngOnInit(): void {
  }

}
