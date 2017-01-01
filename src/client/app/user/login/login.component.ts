import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

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
            }`]
})
export class LoginModalComponent implements AfterViewInit {

  @ViewChild('loginModal') modal : ModalComponent;
  @ViewChild('modalForm') form : Form;

  /**
   * Form Variables
   */
  email: string = '';
  password: string = '';

  /**
   * Creates an instance of UserComponent
   */
  constructor(private router: Router) {}

  ngAfterViewInit() {
      this.modal.open();
  }

  onClose() {
      console.log('login close modal');
      this.closeModal();
  }

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
