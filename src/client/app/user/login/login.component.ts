import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

/**
 * This class represents the lazy loaded UserComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-login-modal',
  template: `
              <modal #loginModal [size]="'lg'"
                            (onOpen)="onOpen()" 
                            (onClose)="onClose()" 
                            (onDismiss)="onDismiss()">
                    <modal-header [show-close]="true">
                        <h4 class="modal-title">Login</h4>
                    </modal-header>
                    <modal-body>
                    </modal-body>
                    <modal-footer>
                    </modal-footer>
                </modal>
            `,
  styles: [`:host {
              display: block;
              padding: 0 16px;
            }`]
})
export class LoginModalComponent  {

  @ViewChild('loginModal') modal : ModalComponent;

  /**
   * Creates an instance of UserComponent
   */
  constructor() {}

  open() {
      this.modal.open();
  }

  onOpen() {
      console.log('login open modal');
  }

  onClose() {
      console.log('login close modal');
  }

  onDismiss() {
      console.log('login dismiss modal');
  }

}
