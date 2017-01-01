import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile.component';
import { KeywordGridModalComponent } from './modal/keyword-grid-modal.component';


@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ProfileComponent,
                 KeywordGridModalComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {}
