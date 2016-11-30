import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataSet } from './models';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the Query service with methods to read names and add names.
 */
@Injectable()
export class GraphService {

  API = 'http://oblong-relentless.herokuapp.com' ;

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP POST request
   * @param {FormQuery} query - the query string to send to the REST Server
   * @return {DataSet} The Observable for the HTTP request.
   */
  getData(query: any): Observable<DataSet> {
    let headers = new Headers({ 'Content-Type': 'text/plain'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.API, JSON.stringify(query), options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  /**
  * Handle HTTP error
  */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

