import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../shared/index';
import { ReturnQuery } from '../models/index';
import { DatatableComponent } from '@swimlane/ngx-datatable';

/**
 * This class represents the lazy loaded ResultsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.css'],
})

export class ResultsComponent implements OnChanges {

  @Input('query') query:string;

  errorMessage: string = '';

  expanded: any = {};
  timeout: any = 100;

  submitted: boolean = false;
  loading: boolean = false;
  querySuccessful: boolean = true;

  personList: ReturnQuery[] = [];

  @ViewChild('mydatatable') table : DatatableComponent;

  /**
   * Creates an instance of the resultsComponent with the injected
   * QueryService.
   *
   * @param {QueryService} queryService - The injected QueryService.
   * @param {Router} router - The inected Router
   */
  constructor(private queryService: QueryService, private router: Router) {}

  /**
   * Handler on input changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.refreshList();
  }

  /**
   * Handles the queryService observable, gets the List from an api
   * @param {string} api: api url to get the list from
   */
  refreshList() {
    this.loading = true;
    this.queryService.getList(this.query)
      .subscribe(
        data => {
          console.log('search results', data);
          this.querySuccessful = data.length !== 0;
          this.personList = data;
          this.submitted = true;
          this.loading = false;
        },
        error =>  {this.errorMessage = <any>error; console.log(error); this.loading = false;},
        () => console.log('Results List Request Complete')
      );
  }

  /**
   * Handles the queryService observable, gets the summary of a person from the api
   * @param {number} i: the index of the person to get within the personList
   */
  getPersonSummary(api: string, i : number) {
    console.log(this.personList[i]);
  }

  /**
   * Returns the top four keywords
   * @param {DataTableElement} : person to get keywords from
   */
  getTopFourKeywords(person: ReturnQuery) {
    return person.keywords;
  }


  /**
   * Manually toggles the given row, will close it if its open
   * @param {ReturnQuery} row: the row to toggle
   */
  toggleExpandRow(row: any) {
    console.log(row);
    this.table.toggleExpandRow(row);
  }

  /**
   * Takes the button press event and navigates to the correct place
   */
  expandedButtonPress(row: any) {
    let index = row.$$index;
    this.navigateToProfile(this.personList[index].link);
  }

  /**
   * On the give more details button press, we will navigate to the profile component.
   */
  navigateToProfile(api: string) {
    let vals: string[] = api.split('/');
    this.router.navigate(['profile', {'id': vals[3]}]);
  }


  paged(event : any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

}

