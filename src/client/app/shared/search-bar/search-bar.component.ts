import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../query-service/index';

/**
 * This class represents the search bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.css'],
})
export class SearchBarComponent {
  @Input('query') query:string = '';
  placeholder:string = 'Who would you like to search for?';

  /**
   * Creates the new search-bar component
   * @param {QueryService} queryService - The injected query serivce
   * @param {Router} router - The injected router
   */
  constructor(private queryService: QueryService, private router:Router) {}

  /**
   * Submit handler for the input group
   */
  onSubmit() {
    if(this.query !== '') {
      this.search(this.query);
    }
  }

  /**
   * Takes a returned uri and routes to the results display.
   */
  search(link: string) {
    this.router.navigate(['search',{query: this.query}]);
  }

}
