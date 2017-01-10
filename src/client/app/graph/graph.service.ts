import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../shared/index';
import { DataSet } from './models';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the Query service with methods to read names and add names.
 */
@Injectable()
export class GraphService {

  HomeAPI = Config.VIS_HOME_API;
  SearchAPI = Config.VIS_SEARCH_API;
  ProfileAPI = Config.VIS_PROFILE_API;

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
   * @param {Object} query - the query object to determine the correct api is called
   */
  getData(path:string, query: Object) {
    if(path === 'profile') {
      return this.getProfileData(query);
    } else if(path === 'results') {
      return this.getSearchData(query);
    } else {
      return this.getHomeData();
    }
  }

  /**
   * Returns an Observable for the HTTP POST request
   * @param {Object} query - the query string to send to the REST Server
   * @return {DataSet} The Observable for the HTTP request.
   */
  getProfileData(query: Object): Observable<DataSet> {
    console.log('Getting Data From', this.ProfileAPI, JSON.stringify(query));
    return this.http.post(this.ProfileAPI, JSON.stringify(query))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  getSearchData(data: Object): Observable<DataSet> {
    console.log('Getting Data From', this.SearchAPI, JSON.stringify(data));
    return this.http.post(this.SearchAPI, JSON.stringify(data))
                    .map((res:Response) => res.json())
                    .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP POST request
   * @param {Object} query - the query string to send to the REST Server
   * @return {DataSet} The Observable for the HTTP request.
   */
  getHomeData(): Observable<DataSet> {
    console.log('Getting Data From', this.HomeAPI);
    return this.http.post(this.HomeAPI, JSON.stringify({}))
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

