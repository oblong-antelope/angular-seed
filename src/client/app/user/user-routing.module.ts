import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user.profile/user.profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user',
        children:[
          {
            path: ':id',
            children:[{
              path: 'profile',
              component: UserProfileComponent
            }]
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
