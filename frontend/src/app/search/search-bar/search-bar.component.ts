import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Job} from '../../_models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {AlertService, JobService} from '../../_services';
import {sha256} from 'js-sha256';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  loading = false;
  searched = false;
  returnUrl: string;
  jobs: Job[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private alertService: AlertService) {
  }

  onSearch() {
    this.searched = true;
    if (this.invalidForm()) return;
    this.loading = true;
    this.jobService.searchJobs(this.get('searchTerm').value)
    console.log( 'Found \'' + this.jobs.length + '\'');
  }


  private invalidForm(): boolean {
    return this.invalidSearchTerm();
  }
  invalidSearchTerm(): boolean {
    return this.get('searchTerm').value.length === 0;
  }
  // helper method
  private get(id: string) {
    return (<HTMLInputElement>document.getElementById(id));
  }
  ngOnInit(): void {
  }



}
