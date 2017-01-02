import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { UserService } from './user-service/user.service';

import { LoginModalComponent } from './login/login.component';
import { LogoutModalComponent } from './logout/logout.component';
import { UserProfileComponent } from './user.profile/user.profile.component';
import { SignupModalComponent } from './signup/signup.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            UserRoutingModule,
            SharedModule],
  declarations: [LoginModalComponent,
                 LogoutModalComponent,
                 UserProfileComponent,
                 SignupModalComponent],
  providers: [UserService],
  exports: []
})
export class UserModule { }
