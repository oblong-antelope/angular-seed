import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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

  OtherAPI = 'https://oblong-relentless.herokuapp.com' ;
  ProfileAPI = 'https://oblong-onslaught.herokuapp.com' ;

  // headers = new Headers({ 'Content-Type': 'application/json'});
  // options = new RequestOptions({ headers: this.headers });

  /** 
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Splitter to ensure the correct api is called
   */
  getData(query: Object) {
    if(Object.keys(query).length === 0 && query.constructor === Object) {
      return this.getOtherData();
    } else {
      return this.getProfileData(query);
    }
  }

  /**
   * Returns an Observable for the HTTP POST request
   * @param {Object} query - the query string to send to the REST Server
   * @return {DataSet} The Observable for the HTTP request.
   */
  getProfileData(query: Object): Observable<DataSet> {
    console.log('Getting Data From', this.ProfileAPI, JSON.stringify(query));
    return this.http.post(this.ProfileAPI, JSON.stringify(query))//, this.options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP POST request
   * @param {Object} query - the query string to send to the REST Server
   * @return {DataSet} The Observable for the HTTP request.
   */
  getOtherData(): Observable<DataSet> {
    console.log('Getting Data From', this.OtherAPI);
    return this.http.post(this.OtherAPI, JSON.stringify({}))//, this.options)
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

