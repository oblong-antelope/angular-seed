import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'search',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: HomeComponent
      },
      {
        path: '**',
        component: HomeComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
