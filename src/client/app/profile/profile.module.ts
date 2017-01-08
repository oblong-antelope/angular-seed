import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProgressbarModule } from 'ng2-bootstrap';

import { UserModule } from '../user/user.module';
import { ProfileComponent } from './profile.component';

import { KeywordGridModalComponent } from './modal/keyword-grid-modal.component';
import { AddKeywordModalComponent } from './modal/add-keyword.modal.component';
import { PublicationsModalComponent } from './modal/publications.modal.component';


@NgModule({
  imports: [CommonModule, SharedModule, UserModule, ProgressbarModule.forRoot()],
  declarations: [ProfileComponent,
                 KeywordGridModalComponent,
                 AddKeywordModalComponent,
                 PublicationsModalComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {}
