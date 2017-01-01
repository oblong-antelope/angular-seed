import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

import { QueryService } from '../../shared/index';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

export function main() {
   describe('Profile component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        providers: [
          { provide: Router,  useClass: RouterStub },
          ActivatedRoute,
          QueryService
        ],
        imports: []
      }).compileComponents();
    }));

    // it('should work',
    //   async(() => {
    //     TestBed
    //       .compileComponents()
    //       .then(() => {
    //         let fixture = TestBed.createComponent(TestComponent);
    //         let aboutDOMEl = fixture.debugElement.children[0].nativeElement;

	  //         expect(aboutDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
    //       });
    //     }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-profile></sd-profile>'
})
class TestComponent {}
