import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../index';
import { ReturnQuery,
         Profile
        } from '../../models/index';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the Query service with methods to read names and add names.
 */
@Injectable()
export class QueryService {

  API = Config.API;

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP POST request
   * @param {FormQuery} query - the query string to send to the REST Server
   * @return {ReturnQuery[]} The Observable for the HTTP request.
   */
  getList(query: string): Observable<ReturnQuery[]> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.genUri('/api/queries'), query, options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @param {string} api : The location fo the resource
   * @return {Profile} The Observable for the http request.
   */
  getProfile(api: string) : Observable<Profile> {
    return this.http.get(this.genUri(api))
                    .map((res:Response) => res.json())
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

  /**
   * Appends path to API
   * @param {string} path - path to resource
   * @return {string} - full path including server address
   */
  private genUri(path: string, query?: string) : string {
    return this.API + path + (query === undefined ? '' : query);
  }
}

