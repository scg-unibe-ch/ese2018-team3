import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Job} from '../_models';
import {JobService} from '../_services';
import {ThemeService} from '../_services/theme.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    advancedSearch: boolean = false;
    jobs: Job[];

    constructor(
        private httpClient: HttpClient,
        private jobService: JobService,
        private themeService: ThemeService
    ) {
    }

    ngOnInit() {
        if (this.themeService.getIsNight() == 'true') {
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
        const query = {
            company: this.get('company').value,
            title: this.get('title').value,
            description: this.get('description').value,
            occupation: this.get('occupation').value,
            qualifications: this.get('qualifications').value,
            remarks: this.get('remarks').value,
            salary: this.get('salary').value,
            contact: this.get('contact').value
        };

        console.log(`Query: JSON.stringify(query)`);
        this.jobService.search(query).subscribe( jobs => {
            this.jobs = jobs;
            console.log(`Received ${jobs.length} results`);
        });
    }

    private get(id: string) {
        if (!this.advancedSearch) return (<HTMLInputElement>document.getElementById('searchTerm'));
        return (<HTMLInputElement>document.getElementById(id));
    }

}
