import { Component, OnInit } from '@angular/core';

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
  roles: string[] = ['', 'Collaborator', 'Supervisor', 'Lecturer'];
  submitted: boolean;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor() {}

  /**
   * Initialise the form OnInit
   */
  ngOnInit() {
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
    this.submitted = false;
  }


  /**
   * Handle the nameListService observable
   */
  // getNames() {
  //   this.nameListService.get()
  //     .subscribe(
  //       names => this.names = names,
  //       error =>  this.errorMessage = <any>error
  //     );
  // }

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

export class FormQuery {
  constructor(
    public expertise: string,
    public role: string
  ) {}
}

export interface ReturnQuery {
  name: string;
  department: string;
  info: string;
}
