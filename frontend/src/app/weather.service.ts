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
  getWeatherData(){
    // define the headers for out HTTP request. Most importantly, we want the requested content type to be JSON.
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.get(this.url).pipe(
      map(this.extractData)
    )
  }

  public extractData(res: Response){
    /*if(res.status < 200 || res.status >= 300){
      // if the HTTP status code is not within the 2xx range, something went wrong. Maybe we made a bad request, or the
      // server was unable to answer it, etc.
      throw new Error('Bad response status: ' + res.status);
    }*/
    // TODO: add status code check again, once fixed in backend || or is this a problem here?
    return res || { }
  }

}
