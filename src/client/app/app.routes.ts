import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { ProfileRoutes } from './profile/index';
import { LandingRoutes } from './landing/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...ProfileRoutes,
  ...LandingRoutes
];
