import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Profile } from '../../models/index';

@Component({
    moduleId: module.id,
    selector: 'sd-edit-profile-modal',
    styles: [],
    templateUrl: './edit-profile-modal.component.html'
})
export class EditProfileModalComponent implements OnInit {

    @Input('profile') profile: Profile = undefined;
    @Output('onEditProfile') onEditProfile : EventEmitter<Profile> = new EventEmitter();

    @ViewChild('editModal') editModal: ModalComponent;
    @ViewChild('confirmModal') confirmModal: ModalComponent;


    editForm : FormGroup;
    confirmed = false;

    constructor(private fb : FormBuilder) {}

    ngOnInit() {
        this.editForm = this.fb.group({
            title: '',
            firstname: '',
            lastname: '',
            department: '',
            campus: '',
            faculty: '',
            building: '',
            room: '',
            email: '',
            website: ''
        });
    }

    /**
     * Form is populated when the modal is opened.
     */
    onOpen() {
        console.log(this.profile);
        this.editForm.setValue({
            title: this.profile.name.title,
            firstname: this.profile.name.first,
            lastname: this.profile.name.last,
            department: this.profile.department,
            campus: this.profile.campus,
            faculty: this.profile.faculty,
            building: this.profile.building,
            room: this.profile.building,
            email: this.profile.email,
            website: this.profile.website
        });
    }

    /**
     * Outer open method.
     */
    open() {
        this.editModal.open();
    }

    save(form: FormGroup) {
        //save
        console.log(this.profile);
        this.editForm.dirty = false;
    }

    close() {
        if(this.editForm.dirty) {
            this.confirmModal.open();
            return;
        };
    }

    onConfirmModalClose() {
        this.confirmModal.close();
        this.editModal.close();
        //Check for changes and they discard changes
    }

    onConfirmModalContinue() {
        this.confirmModal.close();
        //check for changes and they stay
    }


}
