import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Job For You';
	baseUrl = environment.baseUrl;

	constructor(private httpClient: HttpClient) {
   // this.baseUrl = environment.baseUrl;
	}

	ngOnInit() {
	}


}
