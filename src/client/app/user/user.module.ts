import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { LoginModalComponent } from './login/login.component';
import { UserProfileComponent } from './user.profile/user.profile.component';
import { SignupModalComponent } from './signup/signup.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [CommonModule, UserRoutingModule, SharedModule],
  declarations: [LoginModalComponent,
                 UserProfileComponent,
                 SignupModalComponent],
  exports: [LoginModalComponent,
            SignupModalComponent]
})
export class UserModule { }
