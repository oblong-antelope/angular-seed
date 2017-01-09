import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProgressbarModule } from 'ng2-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { UserModule } from '../user/user.module';
import { ProfileComponent } from './profile.component';

import { KeywordGridModalComponent } from './modal/keyword-grid-modal.component';
import { AddKeywordModalComponent } from './modal/add-keyword.modal.component';
import { PublicationsModalComponent } from './modal/publications.modal.component';
import { EditProfileModalComponent } from './modal/edit-profile-modal.component';


@NgModule({
  imports: [CommonModule,
            SharedModule,
            NgxDatatableModule,
            FormsModule,
            ReactiveFormsModule,
            UserModule,
            ProgressbarModule.forRoot()],
  declarations: [ProfileComponent,
                 KeywordGridModalComponent,
                 AddKeywordModalComponent,
                 PublicationsModalComponent,
                 EditProfileModalComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {}
