import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginModalComponent } from './login/login.component';
import { SignupModalComponent } from './signup/signup.component';
import { UserProfileComponent } from './user.profile/user.profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginModalComponent,
        outlet: 'modal'
      },
      {
        path: 'signup',
        component: SignupModalComponent,
        outlet: 'modal'
      }
    ])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
