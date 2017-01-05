import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard/auth-guard.service';
import { LoginModalComponent } from './login/login.component';
import { LogoutModalComponent } from './logout/logout.component';
import { SignupModalComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginModalComponent,
        outlet: 'modal'
      },
      {
        path: 'logout',
        component: LogoutModalComponent,
        outlet: 'modal'
      },
      {
        path: 'signup',
        component: SignupModalComponent,
        outlet: 'modal'
      },
      {
        path: 'user/:id',
        children: [{
          path: 'profile',
          component: UserProfileComponent
        }],
        canActivate: [AuthGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
