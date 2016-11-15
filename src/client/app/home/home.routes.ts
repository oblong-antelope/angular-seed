import { Route } from '@angular/router';
import { HomeComponent } from './index';

export const LandingRoutes: Route[] = [
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
  }
];
