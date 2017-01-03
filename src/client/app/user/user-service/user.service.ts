import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../shared/index';
import { ReturnQuery,
         Profile
        } from '../../models/index';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the User service with methods to serve user login, signup and profiling.
 */
@Injectable()
export class UserService {

  API = Config.API;

  /**
   * Creates a new UserService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns true if the user is logged in 
   * i.e. there is a registered jwt in localstorage
   * @return {boolean} Whether the user is logged in
   */
  isLoggedIn(): boolean {
    let jwt = localStorage.getItem('jwt');
    return jwt !== undefined && jwt !== '' && jwt !== null;
  }

  /**
   * Returns the user Id of the logged in user if logged in
   * otherwise an empty string.
   * @return {string} The User Id if logged in.
   */
  getId(): string {
    return this.isLoggedIn() ? localStorage.getItem('userId'): '';
  }

  /**
   * Returns an observable of a boolean detailing a successful login or not.
   * On a successful login, the user jwt is stored and userid stored for later use in localstorage
   * @param {any} details - the login details to be sent to the server
   * @return {Observable<boolean>} The Boolean Observable to be returned and subscribed to.
   */
  login(details: any): Observable<boolean> {
    details['action'] = 'login';
    return this.submitUserAction(details)
          .map( (data) => {
            console.log(data);
            if(data.success) {
              localStorage.setItem('jwt', data.jwt);
              localStorage.setItem('userId', data.userId);
            }
            return data.success;
          });
  }

  /**
   * Returns an observable of a boolean detailing a successful logout or not.
   * The details object is created to tell the server who to logout and invalidate.
   * On a successful logout, the user jwt and userid are cleared
   * @param {any} details - the login details to be sent to the server
   * @return {Observable<boolean>} The Boolean Observable to be returned and subscribed to.
   */
  logout(): Observable<boolean> {
    let details = {
      action: 'logout',
      userid: localStorage.getItem('userId')
    };
    return this.submitUserAction(details)
          .map( (data) => {
            console.log(data);
            if(data.success) {
              localStorage.removeItem('jwt');
              localStorage.removeItem('userId');
            }
            return data.success;
          });
  }

  /**
   * Returns an observable of a boolean detailing a successful signup or not.
   * @param {Object} details - the signup details to be sent to the server
   * @return {Observable<boolean>} The Boolean Observable to be returned and subscribed to.
   */
  signup(details: Object): Observable<boolean> {
    // return Observable.of(true);
    return this.submitNewUser('details')
          .map ( (data) => {
            console.log(data);
            return data.success;
          });
  }

  /**
   * Returns an Observable for the HTTP POST request
   * @param {Object} details - the user action details sent to the server
   * @return {any} The Observable Object for the HTTP request.
   */
  private submitUserAction(details: Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.genUri('/api/useraction'), details, options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP POST request
   * @param {Object} details - the user action details sent to the server
   * @return {any} The Observable Object for the HTTP request.
   */
  private submitNewUser(details: Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.genUri('/api/newuser'), details, options)
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

  /**
   * Appends path to API
   * @param {string} path - path to resource
   * @return {string} - full path including server address
   */
  private genUri(path: string, query?: string) : string {
    return this.API + path + (query === undefined ? '' : query);
  }
}


/**
 * A Mockery of the Query Serivce for testing
 */
export class MockQueryService {

  returnGetList: ReturnQuery[];
  returnGetProfile: Profile;

  getList(query: string): Observable<ReturnQuery[]> {
    return Observable.create((observer: any) => {
      observer.next(this.returnGetList);
      observer.complete();
    });
  }

  getProfile(api: string) : Observable<Profile> {
    return Observable.create((observer: any) => {
      observer.next(this.returnGetProfile);
      observer.complete();
    });
  }
}

