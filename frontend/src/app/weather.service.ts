import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url = "http://localhost:3000/weather";

  constructor(private http: HttpClient) { }

  // ask our backend API for the latest weather data via HTTP
  public getWeatherData(){
    // request the data from the API, return it
    return this.http.get(this.url)

    // Note: you might sometimes need to access the HTTP status code, which is a bit more complicated. Check this link
    // for more information on that: https://angular.io/guide/http#reading-the-full-response
  }


}
