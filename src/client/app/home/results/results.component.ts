import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../../shared/index';
import { ReturnQuery } from '../../models/index';
import {
  TableOptions,
  ColumnMode,
  DataTable,
} from 'angular2-data-table/release/index';

/**
 * This class represents the lazy loaded ResultsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.css'],
})

export class ResultsComponent implements OnInit, OnChanges {

  @Input('id') id:number;
  @Input('query') query:string;

  errorMessage: string;

  expanded: any = {};
  timeout: any = 100;

  submitted: boolean = false;
  querySuccessful: boolean = true;

  personList: DataTableElement[] = [];

  @ViewChild('mydatatable') table: DataTable;

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 50,
    detailRowHeight: 200,
    scrollbarV: true,
    scrollbarH: false
  });

  /**
   * Creates an instance of the resultsComponent with the injected
   * QueryService.
   *
   * @param {QueryService} queryService - The injected QueryService.
   * @param {Router} router - The inected Router
   */
  constructor(private queryService: QueryService, private router: Router) {}

  /**
   * Initialise the form OnInit
   */
  ngOnInit() {
      this.refreshList();
  }

  /**
   * Handler on input changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.refreshList();
  }

  /**
   * Gets the list based on the current new values
   */
  refreshList() {
    this.getList('/api/queries/' + this.id);
  }

  /**
   * Handles the queryService observable, gets the List from an api
   * @param {string} api: api url to get the list from
   */
  getList(api : string) {
    this.queryService.getList(api)
      .subscribe(
        data => {
          this.querySuccessful = data.results.length !== 0;
          this.personList = <DataTableElement[]> data.results;
          this.submitted = true;
        },
        error =>  {this.errorMessage = <any>error; console.log(error);},
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
  getTopFourKeywords(person: DataTableElement) {
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
  expandedButtonPress(index: number) {
    this.navigateToProfile(this.personList[index].link);
  }

  /**
   * On the give more details button press, we will navigate to the profile component.
   */
  navigateToProfile(api: string) {
    let vals:string[] = api.split('/');
    this.router.navigate(['profile', {'id': vals[3]}]);
  }


  paged(event : any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

}

interface DataTableElement extends ReturnQuery {
}
