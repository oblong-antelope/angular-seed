import { Component, ElementRef, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UserService } from '../user-service/index';

/**
 * This class represents the lazy loaded LogoutModalComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-logout-modal',
  template: ` <modal #logoutModal [size]="'lg'"
                            (onClose)="onClose()" 
                            (onDismiss)="onDismiss()">
                  <modal-header [show-close]="true">
                      <h4 class="modal-title">Logout</h4>
                  </modal-header>
                  <modal-body>
                    <p>You have logged out</p>
                  </modal-body>
                  <modal-footer>
                  </modal-footer>
              </modal>`,
  styles: [`:host {
              display: block;
              padding: 0 16px;
            }`]
})
export class LogoutModalComponent implements AfterViewInit {

  @ViewChild('logoutModal') modal : ModalComponent;

  /**
   * Creates an instance of LogoutModalComponent
   */
  constructor(private router: Router, private us: UserService) {}

  ngAfterViewInit() {
      this.us.logout();
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
