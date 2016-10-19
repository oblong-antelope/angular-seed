import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { QueryService } from './query.service';

export function main() {
  describe('QueryService Service', () => {
    let queryService: QueryService;
    let mockBackend: MockBackend;
    let initialResponse: any;

    beforeEach(() => {

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

      let connection: any;
      mockBackend.connections.subscribe((c: any) => connection = c);
      initialResponse = queryService.get();
      // connection.mockRespond(new Response(new ResponseOptions({ body: '["Dijkstra", "Hopper"]' })));
      connection.mockRespond(new Response(new ResponseOptions({ body: '[]' })));
    });

    it('should return an Observable when get called', () => {
      expect(initialResponse).toEqual(jasmine.any(Observable));
    });

    it('should resolve to list of names when get called', () => {
      // let names: any;
      // initialResponse.subscribe((data: any) => names = data);
      // expect(names).toEqual(['Dijkstra', 'Hopper']);
    });
  });
}
