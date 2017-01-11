import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../index';
import { PaginatedReturnQuery,
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

  API = Config.BACKEND_API;

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Generates the query endpoint for a given query
   */
  generateQueryEndpoint(query: string) : string {
    return this.genUri('/api/people?query=' + query);
  }

  /**
   * Returns an Observable for the HTTP GET request
   * @param {string} query - the query to submit
   * @param {number} page - the page of pagination
   * @param {size} size - the number to return per page 
   * @return {PaginatedReturnQuery} The Observable for the HTTP request
   */
  getPagedList(query: string,
               page: number,
               size: number): Observable<PaginatedReturnQuery> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
        return this.http.get(this.genUri('/api/people', [
                                    {name: 'query', value: query},
                                    {name: 'page', value: page},
                                    {name: 'page_size', value: size}]),
                                    options)
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



  submitGarbageKeywords(keywords: any[]): Observable<any> {
    let options = new RequestOptions({body: JSON.stringify(keywords)});
    return this.http.delete(this.genUri('/api/keywords'), options)
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
  private genUri(path: string, query?: Query[]) : string {
    let uri = this.API + path + (query === undefined ? '' : '?');
    if(query !==undefined) {
      for(let i = 0; i < query.length; i++) {
        uri += ( query[i].name + '=' + query[i].value );
        if( i < query.length - 1 ) {
          uri += '&';
        }
      }
    }
    return uri;
  }
}

interface Query {
  name: string;
  value: any;
}

