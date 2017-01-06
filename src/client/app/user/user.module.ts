import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { DropdownModule, PopoverModule, AlertModule } from 'ng2-bootstrap';

import { AuthGuard } from './auth-guard/auth-guard.service';
import { UserService } from './user-service/user.service';

import { LoginModalComponent } from './login/login.component';
import { LogoutModalComponent } from './logout/logout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignupModalComponent } from './signup/signup.component';
import { UserNavMenuComponent } from './user-nav-menu/user-nav-menu.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            UserRoutingModule,
            PopoverModule.forRoot(),
            DropdownModule.forRoot(),
            AlertModule.forRoot(),
            SharedModule],
  declarations: [LoginModalComponent,
                 LogoutModalComponent,
                 UserProfileComponent,
                 SignupModalComponent,
                 UserNavMenuComponent],
  providers: [UserService, AuthGuard],
  exports: [UserNavMenuComponent]
})
export class UserModule { }
