import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../index';
import { FormQuery,
         ReturnQuery,
         ReturnLinkQuery,
         ResearchSummary
        } from '../../models/index';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';  // for debugging

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
   * @param {FormQuery} fq - the query to send to the REST Server
   * @return {ReturnQuery[]} The Observable for the HTTP request.
   */
  postForm(fq: FormQuery): Observable<ReturnLinkQuery> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.genUri('/api/query/submit'), JSON.stringify(fq), options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @param {string} api : The location of the resource
   * @return {ReturnQuery[]} The Observable for the HTTP request.
   */
  getList(api: string): Observable<ReturnQuery[]> {
    return this.http.get(this.genUri(api))
                    .map((res: Response) => res.json())
    //              .do(data => console.log('server data:', data))  // debug
                    .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @param {string} api : The location of the resource
   * @return {ResearchSummary} THe Observable for the http RequestOptions
   */
  getResearchSummary(api: string): Observable<ResearchSummary> {

      // let obj: ResearchSummary = {
      //   papers : 21,
      //   keywords: ['artificial intelligence', 'argumentation'],
      //   recent_paper: 'http://www.arxiv.com/mymostrecentpaper',
      //   full_profile: 'http://myfullprofile/api'
      // };

      // return Observable.of(obj);
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

