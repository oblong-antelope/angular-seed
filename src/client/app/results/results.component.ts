import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../shared/index';
import { PaginatedReturnQuery, ShortProfile } from '../models/index';
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

  data: PaginatedReturnQuery = {count: 0};

  limit: number = 7;
  currentPage: number = 0;
  totalRows: number = 0;

  rows: ShortProfile[] = [];

  cssClasses = {
    pagerLeftArrow: 'glyphicon  glyphicon-chevron-left',
    pagerRightArrow: 'glyphicon glyphicon-chevron-right',
    pagerPrevious: 'glyphicon glyphicon-fast-backward',
    pagerNext: 'glyphicon glyphicon-fast-forward'
  };

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
  refreshList(page:number=0) {
    this.loading = true;
    this.queryService.getPagedList(this.query, page, this.limit)
      .subscribe(
        data => {
          this.updateState(data);
          this.submitted = true;
          this.loading = false;
        },
        error =>  {this.errorMessage = <any>error; console.log(error); this.loading = false;},
        () => console.log('Paginated Results List Request Complete')
      );
  }

  /**
   * Takes the returned data from server and 
   * updates the internal display's state with it.
   */
  updateState(data: PaginatedReturnQuery) {
      this.querySuccessful = data.count !== 0;
      this.data = data;
      this.rows = data.this_page;
      this.totalRows = data.count;
  }

  /**
   * Handles the queryService observable, gets the summary of a person from the api
   * @param {number} i: the index of the person to get within the personList
   */
  getPersonSummary(i : number) {
    console.log(this.rows[i]);
  }

  /**
   * Returns the top four keywords
   * @param {DataTableElement} : person to get keywords from
   */
  getTopFourKeywords(person: ShortProfile) {
    return person.keywords;
  }


  /**
   * Manually toggles the given row, will close it if its open
   * @param {ReturnQuery} row: the row to toggle
   */
  toggleExpandRow(row: any) {
    this.table.toggleExpandRow(row);
  }

  /**
   * Takes the button press event and navigates to the correct place
   */
  expandedButtonPress(row: any) {
    let index = row.$$index;
    this.navigateToProfile(this.rows[index].link);
  }

  /**
   * On the give more details button press, we will navigate to the profile component.
   */
  navigateToProfile(api: string) {
    let vals: string[] = api.split('/');
    this.router.navigate(['profile', {'id': vals[4]}]);
  }


  /**
   * Handler for any paging event of the list.
   */
  paged(event : any) {
    if(this.currentPage !== event.offset) {
      this.refreshList(event.offset);
    }
  }

}

