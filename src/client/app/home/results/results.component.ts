import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../../shared/index';
import { ReturnQuery, ResearchSummary } from '../../models/index';
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

export class ResultsComponent implements OnInit {

  @Input('id') id:number;
  @Input('query') query:string;

  errorMessage: string;

  expanded: any = {};
  timeout: any = 100;

  submitted: boolean = false;

  personList: DataTableElement[] = [];

  @ViewChild('mydatatable') table: DataTable;

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 50,
    detailRowHeight: 200,
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
    this.getList('/api/query/' + this.id);
  }

  /**
   * Handles the queryService observable, gets the List from an api
   * @param {string} api: api url to get the list from
   */
  getList(api : string) {
    this.queryService.getList(api)
      .subscribe(
        data => {
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
    let x:string[] = person.summary.keywords;
    return x.slice(0, 4);
  }


  /**
   * Manually toggles the given row, will close it if its open, and get data if it hasnt been got before
   * Asynchronously gets the research summary of the given row
   * @param {ReturnQuery} row: the row to toggle
   */
  toggleExpandRow(row: any) {
    let i:number = row.$$index;

    if(row.$$expanded || this.personList[i].summary !== undefined) {
      this.table.toggleExpandRow(row);
      return;
    }

    this.queryService.getResearchSummary(row.research_summary)
      .subscribe(
        data => {
          this.personList[i].summary = data;
          this.personList[i].row = i;
          this.table.toggleExpandRow(row);
        },
        error =>  {this.errorMessage = <any>error; console.log(error);},
        () => console.log('Research Summary Request Complete')
      );
  }

  /**
   * Takes the button press event and navigates to the correct place
   */
  expandedButtonPress(index: number) {
    if(this.personList[index].full_profile !== undefined) {
      this.navigateToProfile(this.personList[index].full_profile);
    }
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
  summary : ResearchSummary;
  row: number;
}
