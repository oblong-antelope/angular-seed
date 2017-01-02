import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';
import { ReturnQuery, Profile } from '../../models/index';

export function main() {
  describe('UserService Service', () => {
    let userService: UserService;
    let mockBackend: MockBackend;

    //Function Response Responses
    let getListResponse: any;
    let getProfileResponse: any;

    //Mock objects for use in testing
    let mockUri: string;
    let mockQuery: string;
    let mockReturnQuery: ReturnQuery[];
    let mockReturnProfile: Profile;

    beforeEach(() => {
      // Setup Injector
      let injector = ReflectiveInjector.resolveAndCreate([
        UserService,
        BaseRequestOptions,
        MockBackend,
        {provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      userService = injector.get(UserService);
      mockBackend = injector.get(MockBackend);

      //Mock Objects
      mockUri = 'api/test';
      mockQuery = 'query1';
      mockReturnQuery = [{name: {first:'name', last:'last'}, link:'/api/people/1'}];
      mockReturnProfile = {name: {first:'name', last:'last'}, keywords: {}};

      let connection: any;
      mockBackend.connections.subscribe((c: any) => connection = c);

      //Response for getList(string: api)
      getListResponse = userService.getList(mockQuery);
      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockReturnQuery) })));

      getProfileResponse = userService.getProfile(mockUri);
      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockReturnProfile)})));
    });

    it('should return an Observable when getList called', () => {
      expect(getListResponse).toEqual(jasmine.any(Observable));
    });

    it('should resolve to list of names when getList called', () => {
      let list: ReturnQuery[];
      getListResponse.subscribe((data: ReturnQuery[]) => list = data);
      expect(list).toEqual(mockReturnQuery);
    });

    it('should return an Observable when getProfile called', () => {
      expect(getProfileResponse).toEqual(jasmine.any(Observable));
    });

    it('should resolve a Profile object when getProfile called', () => {
      let links: Profile;
      getProfileResponse.subscribe((data: Profile) => links = data);
      expect(links).toEqual(mockReturnProfile);
    });

  });
}
