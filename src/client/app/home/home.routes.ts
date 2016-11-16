import { Route } from '@angular/router';
import { HomeComponent } from './index';

export const HomeRoutes: Route[] = [
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
];
