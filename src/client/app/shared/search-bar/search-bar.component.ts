import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../query-service/index';
import { FormQuery } from '../../models/index';

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
  placeholder:string = 'An expert in NLP';

  /**
   * Creates the new search-bar component
   * @param {QueryService} queryService - The injected query serivce
   * @param {Router} router - The injected router
   */
  constructor(private queryService: QueryService, private router:Router){}

  /**
   * Submit handler for the input group
   */
  onSubmit() {
    console.log(this.query);
    this.submitQuery(this.query);
  }

  /**
   * Submits the stored query to the service.
   * @param {string} query - the query to be sent
   */
  submitQuery(query: string) {
    if(query === '') { return; }
    this.queryService.postQuery(new FormQuery('', query, ''))
          .subscribe(
            data => {
              this.displaySearch(data.results);
            },
            error => console.log(error),
            () => console.log('Query posted to the server')
          );
  }

  /**
   * Takes a returned uri and routes to the results display.
   */
  displaySearch(link: string) {
    let uri:string[] = link.split('/');
    this.router.navigate(['search',{id: uri[3], query: this.query}]);
  }

}
