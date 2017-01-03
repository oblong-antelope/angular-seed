import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UserService } from '../user-service/index';

/**
 * This class represents the lazy loaded UserComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-login-modal',
  templateUrl: './login.component.html',
  styles: [`:host {
              display: block;
              padding: 0 16px;
            }
            .btn-signin {
                float: left;
                margin-left: 20px;
            }`]
})
export class LoginModalComponent implements OnInit, AfterViewInit {

  @ViewChild('loginModal') modal : ModalComponent;
  loginForm : FormGroup;

  /**
   * Form Variables
   */
  email: string = '';
  password: string = '';

  submitted: boolean = false;
  invalidResponse: boolean = false;

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
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    if(this.userService.isLoggedIn()) {
      this.navigateToProfile();
    }
  }

  /**
   * Exectued once the view has been initialised,
   * The modal is immediately opened
   */
  ngAfterViewInit() {
      this.modal.open();
  }

  /**
   * Navigate to the current users profile page
   */
  navigateToProfile() {
    let id = this.userService.getId();
    this.router.navigate(['/user', id, '/profile']);
  }

  /**
   * Navigate to the signup page
   */
  navigateToSignup() {
    this.router.navigate([{outlets: {modal: 'signup'}}]);
  }

  /**
   * Submits the login details to the backend to be verified
   */
  submitLogin(value : any) {
    this.submitted = true;
    this.userService.login(value)
      .subscribe(
        success => {
          this.invalidResponse = !success;
          if(success) {
            this.navigateToProfile();
          }
        },
        error => console.log(error),
        () => console.log('Login Request Complete')
      );
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
    this.router.navigate([{ outlets: { modal: null }}]);
  }

}
