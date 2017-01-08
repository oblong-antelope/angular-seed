import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    moduleId: module.id,
    selector: 'sd-add-keyword-modal',
    styles: [],
    template: ` <modal #keywordModal [size]="'sm'">
                    <modal-header [show-close]="false">
                        <h4 class="modal-title">Add A Keyword</h4>
                    </modal-header>
                    <modal-body>
                        <input type="text" class="form-control" [(ngModel)]="word">
                    </modal-body>
                    <modal-footer>
                        <button type="button" class="btn btn-primary" (click)="submitword()">Submit</button>
                    </modal-footer>
                </modal>`
})
export class AddKeywordModalComponent {

    @Input('word') word: string = '';
    @Output('onAdd') onAdd : EventEmitter<string> = new EventEmitter();

    @ViewChild('keywordModal') keywordmodal: ModalComponent;

    /**
     * Outer open method.
     */
    open() {
        this.keywordmodal.open();
    }

    /**
     * Opens up the add keyword dialogue
     */
    openAddKeyword() {
        this.keywordmodal.open();
    }

    /**
     * Submits a new keyword
     * emits the event back to parent element
     */
    submitword() {
        console.log(this.word);
        this.onAdd.emit(this.word);
        this.keywordmodal.close();
    }
}
