import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/_models';
import { AdminService, AlertService } from 'src/app/_services';

@Component({
	selector: 'app-job-detail',
	templateUrl: './job-detail.component.html',
	styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

	router: Router;
	job: Job;
	private returnUrl: string;

	constructor(
		private adminService: AdminService,
		private alert: AlertService,
		private route: ActivatedRoute,
		router: Router
	) {
		this.router = router;
	}

	ngOnInit() {
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/jobs';
		//TODO:
		this.adminService;
	}

}
