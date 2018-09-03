import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../weather.service";


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
  providers:[ WeatherService ],
})
export class SampleComponent implements OnInit {

	weatherData: any=[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
  	// call the WeatherService, which will take care of the appropriate API request
  	this.weatherService.getWeatherData().subscribe(data=>{
  		this.weatherData=data;
  		console.log(this.weatherData);
  	})

  }

}
