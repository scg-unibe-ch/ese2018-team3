import { Component, OnInit } from '@angular/core';
import { SampleService } from './sample.service';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
  providers:[ SampleService ],
})
export class SampleComponent implements OnInit {

	users: any=[];

  constructor(private sampleService: SampleService) { }

  ngOnInit() {

  	// call service from component
  	this.sampleService.getUsers().subscribe(data=>{
  		this.users=data;
  		console.log(this.users)
  	})

  }

}
