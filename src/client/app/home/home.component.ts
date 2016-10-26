import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService } from '../shared/index';
import { FormQuery, ReturnQuery, ResearchSummary } from '../models/index';
import {
  TableOptions,
  SelectionType,
  TableColumn,
  ColumnMode,
  DataTable,
  DataTableBodyRow
} from 'angular2-data-table';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  errorMessage: string;

  query: FormQuery;
  roles: string[] ;
  expanded: any = {};
  submitted: boolean;
  timeout: any;

  personList: DataTableElement[];

  @ViewChild('mydatatable') table: DataTable;

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 50,
    detailRowHeight: 150,
  });

  /**
   * Creates an instance of the HomeComponent with the injected
   * QueryService.
   *
   * @param {QueryService} queryService - The injected QueryService.
   */
  constructor(private queryService: QueryService) {}

  /**
   * Initialise the form OnInit
   */
  ngOnInit() {
    this.roles = ['None Specific', 'Collaborator', 'Supervisor', 'Lecturer'];
    this.resetForm();
  }


  /**
   * Handle the submit event from the form
   */
  onSubmit() {
    console.log('Submitted', this.query);
    this.submitted = true;
    this.sendQuery();
  }

  /**
   * Resets the query form.
   */
  resetForm() {
    this.query = new FormQuery('', '', this.roles[0]);
    this.personList = [];
    this.submitted = false;
  }


  /**
   * Handle the queryService observable
   */
  sendQuery() {
    this.queryService.postForm(this.query)
      .subscribe(
        link => {
          if(link.success) {
            this.getList(link.results);
          }
        },
        error =>  {this.errorMessage = <any>error; console.log(error);},
        () => console.log('Research Summary Request Complete')
      );
  }

  /**
   * Handles the queryService observable, gets the List from an api
   * @param {string} api: api url to get the list from
   */
  getList(api : string) {
    this.queryService.getList(api)
      .subscribe(
        list => {
          this.personList = <DataTableElement[]> list;
          console.log('List Returned', this.personList);
        },
        error =>  {this.errorMessage = <any>error; console.log(error);},
        () => console.log('Research Summary Request Complete')
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
          this.table.toggleExpandRow(row);
        },
        error =>  {this.errorMessage = <any>error; console.log(error);},
        () => console.log('Research Summary Request Complete')
      );
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
}
