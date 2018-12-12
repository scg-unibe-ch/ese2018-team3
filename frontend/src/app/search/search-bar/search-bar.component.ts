import {Component, OnInit} from '@angular/core';
import {Job} from '../../_models';
import {JobService} from '../../_services';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
    searchTermFromBar: string;
    jobsId: Job[] = [];

    constructor(
        private jobService: JobService) {
    }

    onSearch() {
        this.jobService.searchJobs(this.get('searchTermFromBar').value).subscribe(
            (jobs: Job[]) => {
                this.jobsId = jobs;
            }
        );
        console.log(this.jobsId[0]);
    }

    ngOnInit(): void {
    }

    // helper method
    private get(id: string) {
        return (<HTMLInputElement>document.getElementById(id));
    }

}
