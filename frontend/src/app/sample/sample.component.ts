import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../weather.service";


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
  providers:[ WeatherService ],
})
export class SampleComponent implements OnInit {

	weather_data: any=[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

  	// call service from component
  	this.weatherService.getWeatherData().subscribe(data=>{
  		this.weather_data=data;
  		console.log(this.weather_data);
  	})

  }

}
