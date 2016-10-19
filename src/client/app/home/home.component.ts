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
    this.roles = ['', 'Collaborator', 'Supervisor', 'Lecturer']
    this.resetForm();
  }


  /**
   * Handle the submit event from the form
   */
  onSubmit() {
    console.log('Submitted', this.query);
    this.submitted = true;
  }

  /**
   * Resets the query form.
   */
  resetForm() {
    this.query = new FormQuery('', '');
    this.personList = [];
    this.submitted = false;
  }


  /**
   * Handle the querySerivce observable
   */
  sendQuery() {
    this.queryService.get()
      .subscribe(
        list => this.personList = list,
        error =>  this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  // addName(): boolean {
  //   // TODO: implement nameListService.post
  //   this.names.push(this.newName);
  //   this.newName = '';
  //   return false;
  // }
}