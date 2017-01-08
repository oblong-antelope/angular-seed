import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    moduleId: module.id,
    selector: 'sd-publications-modal',
    styles: [],
    template: ` <modal #mymodal [size]="'lg'">
                    <modal-header [show-close]="false">
                        <h4 class="modal-title">Publications</h4>
                    </modal-header>
                    <modal-body>
                        <ul *ngFor="let pub of publications">
                            <li>{{pub.title}}</li>
                        </ul>
                    </modal-body>
                    <modal-footer>
                        <button type="button" class="btn btn-primary" (click)="this.modal.dismiss()">Close</button>
                    </modal-footer>
                </modal>`
})
export class PublicationsModalComponent {

    @Input('publications') publications: Publication[] = [];

    @ViewChild('mymodal') modal: ModalComponent;

    /**
     * Outer open method.
     */
    open() {
        this.modal.open();
    }
}

interface Publication {
    link: string;
    title: string;
}
