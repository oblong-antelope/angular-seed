import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { QueryService } from './query.service';
import { FormQuery, ReturnLinkQuery, ReturnQuery } from '../../models/index';

export function main() {
  describe('QueryService Service', () => {
    let queryService: QueryService;
    let mockBackend: MockBackend;

    //Function Response Responses
    let getListResponse: any;
    let postFormResponse: any;

    //Mock objects for use in testing
    let mockUri: string;
    let mockFormQuery: FormQuery;
    let mockReturnQuery: ReturnQuery[];
    let mockReturnLinkQuery: ReturnLinkQuery;

    beforeEach(() => {
      // Setup Injector
      let injector = ReflectiveInjector.resolveAndCreate([
        QueryService,
        BaseRequestOptions,
        MockBackend,
        {provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      queryService = injector.get(QueryService);
      mockBackend = injector.get(MockBackend);

      //Mock Objects
      mockUri = 'api/test';
      mockFormQuery = new FormQuery('expertise1', 'collaborator');
      mockReturnLinkQuery = {success: true, results:'api/query/someuri'};
      mockReturnQuery = [{name:'name', department:'department',  email:'email@email', info: ''}];

      let connection: any;
      mockBackend.connections.subscribe((c: any) => connection = c);

      //Response for getList(string: api)
      getListResponse = queryService.getList(mockUri);
      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockReturnQuery) })));

      postFormResponse = queryService.postForm(mockFormQuery);
      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockReturnLinkQuery)})))
    });

    it('should return an Observable when getList called', () => {
      expect(getListResponse).toEqual(jasmine.any(Observable));
    });

    it('should resolve to list of names when getList called', () => {
      let list: ReturnQuery;
      getListResponse.subscribe((data: ReturnQuery) => list = data);
      expect(list).toEqual(mockReturnQuery);
    });

    it('should return an Observable when postForm called', () => {
      expect(postFormResponse).toEqual(jasmine.any(Observable));
    });

    it('should resolve a LinkQuery object when postForm called', () => {
      let links: ReturnLinkQuery;
      postFormResponse.subscribe((data: ReturnLinkQuery) => links = data);
      expect(links).toEqual(mockReturnLinkQuery);
    })

  });
}
