import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user',
        children:[
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'signup',
            component: SignupComponent
          },
          {
            path: ':id',
            children:[{
              path: 'profile',
              component: ProfileComponent
            }]
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
