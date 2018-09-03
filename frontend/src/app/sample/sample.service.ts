import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';



const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class SampleService {

	url: string= "https://jsonplaceholder.typicode.com/users";
	data: any;

	constructor(private http:HttpClient) {}

	// http service that calls an API endpint to get users
	getUsers() {

		let headers = new Headers({ 'Content-Type': 'application/json' });

		return this.http.get(this.url).pipe(
		map(this.extractData))
	}



	public extractData(res: Response) {

		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res;
		return body || { };
	}


	public handleError (error: any) {

		let errMsg = error.statusText;
		return Observable.throw(errMsg);
	}


}