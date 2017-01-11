import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Profile } from '../../models/index';

@Component({
    moduleId: module.id,
    selector: 'sd-contact-modal',
    styles: [],
    template: ` <modal #contactModal>
                    <modal-header [show-close]="false">
                        <h4 class="modal-title">Contact</h4>
                    </modal-header>
                    <modal-body>
                        <label for="website">Email</label>
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <a href="mailto:{{profile.email}}">{{profile.email}}</a>
                            </div>
                        </div>
                        <label for="website">Website</label>
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <a href="{{profile.website}}" target="_blank">{{profile.website}}</a>
                            </div>
                        </div>
                    </modal-body>
                    <modal-footer>
                        <button type="button" class="btn btn-primary" (click)="modal.close()">Close</button>
                    </modal-footer>
                </modal>`
})
export class ContactModalComponent {

    @Input('profile') profile: Profile;

    @ViewChild('contactModal') modal: ModalComponent;

    /**
     * Outer open method.
     */
    open() {
        this.modal.open();
    }
}
