import { Component, ElementRef, ViewChild, Renderer, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UserService } from '../user-service/index';

/**
 * This class represents the lazy loaded UserComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-signup-modal',
  templateUrl: './signup.component.html',
  styles: [`:host {
              display: block;
              padding: 0 16px;
            }`]
})
export class SignupModalComponent implements OnInit, AfterViewInit {

  @ViewChild('signupModal') modal : ModalComponent;
  @ViewChild('successModal') smodal : ModalComponent;

  /**
   * Form Variables
   */
  signupForm : FormGroup;
  titleOptions : string[] = ['Mr', 'Ms', 'Mrs', 'Dr', 'Prof'];

  loading: boolean = false;

   /**
   * Creates an instance of UserComponent
   */
  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService) {}

  /**
   * Executed when the component is initialised.
   * The form is initialised with Validators
   * If the user is already logged in, we go straight to the profile page.
   */
  ngOnInit() {
    this.signupForm = this.fb.group({
      title: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 /**
  * Exectued once the view has been initialised,
  * The modal is immediately opened
  */
  ngAfterViewInit() {
      this.modal.open();
  }

  /**
   * Navigate To the Login Page After A Successful signup
   */
  navigateToLogin() {
      this.router.navigate([{outlets: {modal: 'login'}}]);
  }

  /**
   * Submits the signup details to the backend.
   */
  submitSignup(value: any) {
      console.log(value);
      this.loading = true;
      this.userService.signup(value)
        .subscribe(
            success => {
                this.loading = false;
                this.modal.close();
                this.smodal.open();
            },
            error => console.log(error),
            () => console.log('Signup Request Complete')
        );
  }

  /**
   * Checks if the given field is errored or not
   * @param {string} field - the name of the field to be checked
   * @return {boolean} - returns true if there is an error
   */
  fieldError(field: string) : boolean {
      return !this.signupForm.controls[field].valid
                && this.signupForm.controls[field].touched;
  }

  /**
   * Handler on closing of the modal
   */
  onClose() {
      console.log('login close modal');
      this.closeModal();
  }

  /**
   * Handler on dismiss of the modal
   */
  onDismiss() {
      console.log('login dismiss modal');
      this.closeModal();
  }

  closeModal() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { modal: 'login' }}]);
  }
}
