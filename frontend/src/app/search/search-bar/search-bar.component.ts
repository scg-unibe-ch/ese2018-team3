import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Job} from '../../_models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {JobService} from '../../_services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  private searchTerms = new Subject<string>();
  job: Job[];
  job$: Observable<Job[]>;

  constructor(
    private jobService: JobService) {
  }

  // Push a search term into the observable stream.
  search(searchTerm: string): void {
    this.searchTerms.next(searchTerm);
  }

  ngOnInit(): void {
    this.job$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((searchTerm: string) => this.jobService.searchJobs(searchTerm)),
    );
  }



}
