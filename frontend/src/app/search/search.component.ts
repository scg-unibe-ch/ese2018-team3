import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Job} from '../_models';
import {JobService} from '../_services';
import {Location} from '@angular/common';
import {ThemeService} from '../_services/theme.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm: string;
  jobs: Job[];

  constructor(
    private httpClient: HttpClient,
    private jobService: JobService,
    private themeService: ThemeService
  ) {  }

  ngOnInit() {
      if (this.themeService.getIsNight() == 'true'){
        this.themeService.changeDesignToNightTheme();
      }
  }

  shortenDescription(job: Job) {
    const length = Math.min(job.description.length - 1, 100);
    let desc = job.description.substr(0, length);
    if (job.description.length > 100) desc += '...';
    return desc;
  }

  onSearch() {
    this.jobService.searchJobs(this.get('searchTerm').value).subscribe(
      (jobs: Job[]) => {
        this.jobs = jobs;
      }
    );
    console.log(this.jobs[0]);
  }

  private get(id: string) {
    return (<HTMLInputElement>document.getElementById(id));
  }

}
