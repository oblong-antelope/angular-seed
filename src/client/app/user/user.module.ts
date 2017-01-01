import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { LoginModalComponent } from './login/login.modal.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [CommonModule, UserRoutingModule, SharedModule],
  declarations: [LoginComponent,
                 LoginModalComponent,
                 ProfileComponent,
                 SignupComponent],
  exports: []
})
export class UserModule { }
