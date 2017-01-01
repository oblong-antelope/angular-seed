import { Component, ElementRef, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

/**
 * This class represents the lazy loaded UserComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-signup-modal',
  template: ` <modal #signupModal [size]="'lg'"
                            (onClose)="onClose()" 
                            (onDismiss)="onDismiss()">
                  <modal-header [show-close]="true">
                      <h4 class="modal-title">Sign Up</h4>
                  </modal-header>
                  <modal-body>
                  </modal-body>
                  <modal-footer>
                  </modal-footer>
              </modal>`,
  styles: [`:host {
              display: block;
              padding: 0 16px;
            }`]
})
export class SignupModalComponent implements AfterViewInit{

  @ViewChild('signupModal') modal : ModalComponent;

  /**
   * Creates an instance of UserComponent
   */
  constructor(private router: Router) {}

  ngAfterViewInit() {
      this.modal.open();
  }

  onClose() {
      console.log('signup close modal');
      this.closeModal();
  }

  onDismiss() {
      console.log('signup dismiss modal');
      this.closeModal();
  }

  closeModal() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { modal: null }}]);
  }
}
