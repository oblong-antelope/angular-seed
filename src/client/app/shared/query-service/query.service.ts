import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../index';
import { FormQuery,
         ReturnQuery,
         ReturnLinkQuery,
         ResearchSummary,
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

  navigationInformation: string = '/api/person/0/full';

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
   * @return {ResearchSummary} THe Observable for the http request
   */
  getResearchSummary(api: string): Observable<ResearchSummary> {
    return this.http.get(this.genUri(api))
                    .map((res:Response) => res.json())
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
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @param {string} api : The location fo the resource
   * @return {Profile} The Observable for the http request.
   */
  getSomeData(api: string) : Observable<any> {
    return this.http.get(api)
                    .do((res) => console.log(res))
                    .map((res:Response) => res.text())
                    .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {any} The Observable for the http request
   */
  getExpertiseWebData() : Observable<any> {
    return Observable.of({});
  }

  /**
   * A temporary store for data between router navigations
   */
  storeNavigationInformation(information: string) {
    this.navigationInformation = information;
  }

  /**
   * Returns the value in the temporary store and emptys it.
   */
  getNavigationInformation() {
    let k: string = this.navigationInformation;
    // this.navigationInformation = '';
    return k;
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

