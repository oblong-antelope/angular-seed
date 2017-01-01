import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  async
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  // HttpModule
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HomeModule } from '../home.module';

import { QueryService } from '../../shared/index';

class FakeQueryService {
  postForm(fq:any) { return fq; }
  getList(api:string) { return api; }
  getResearchSummary(api:string) { return api; }
}

export function main() {
  let fixture:any;

  describe('Home component', () => {
    // setting module for testing
    // Disable old forms
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HomeModule],
        declarations: [TestComponent],
        providers: [
          BaseRequestOptions,
          MockBackend,
          //QueryService,
          { provide: QueryService,    useClass: FakeQueryService },
          { provide: Http, useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          },
        ]
      }).compileComponents().then(() => {
          fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();
      });
    }));

    // it('should work 2', () => {
    //   expect(1).toEqual(1);
    // });

    /**it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            let homeInstance = fixture.debugElement.children[0].componentInstance;
            //let homeDOMEl = fixture.debugElement.children[0].nativeElement;

            expect(homeInstance.queryService).toEqual(jasmine.any(QueryService));
            //expect(homeDOMEl.querySelectorAll('li').length).toEqual(0);


            // Need to find way of testing the sendQuery function
            // homeInstance.newName = 'Minko';
            // homeInstance.addName();

            // fixture.detectChanges();

            // expect(homeDOMEl.querySelectorAll('li').length).toEqual(1);
            // expect(homeDOMEl.querySelectorAll('li')[0].textContent).toEqual('Minko');

          });

      })); **/

  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-home></sd-home>'
})
class TestComponent { }
