import { Component, OnInit } from '@angular/core';
import { QueryService } from '../shared/index';
import { FormQuery, ReturnQuery } from '../models/index';

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
  submitted: boolean;

  personList: ReturnQuery[];

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
    this.query = new FormQuery('', this.roles[0]);
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
        error =>  {this.errorMessage = <any>error; console.log(error);}
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
          this.personList = list;
          console.log('List Returned', this.personList);
        },
        error =>  {this.errorMessage = <any>error; console.log(error);}
      );
  }

}
