import { Component, ElementRef, ViewChild, Renderer, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * This class represents the lazy loaded UserComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  template: `<h1>{{display}}</h1>`,
    styles: [`:host {
              display: block;
              padding: 0 16px;
            }`]
})
export class UserProfileComponent implements OnInit {

  display: string = 'Profile Component';

  /**
   * Creates an instance of UserComponent
   * @param {Renderer} renderer - injects the renderer
   * @param {Router} router - injects the router service
   * @param {ActivatedRoute} ar - injects details of the current activated route
   */
  constructor(private renderer:Renderer,
              private router: Router,
              private ar: ActivatedRoute) {}

  /**
   * Immediately navigates to the existing profile page for a person.
   * May need to call function to get some data on the profile as 
   * id != backendlookupid TODO
   */
  ngOnInit() {
    this.ar.params.subscribe(
      params => {
        let id = params['id'];
        this.router.navigate(['profile', {id: id}]);
      },
      error => this.router.navigate(['/'])
    );
  }

}
