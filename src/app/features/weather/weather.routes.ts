import { Routes } from '@angular/router';

import { Paths } from '@configs/paths';

export const WEATHER_ROUTER: Routes = [
  {
    path: Paths.WEATHER,
    loadComponent: () => import('./pages/challenge-page/challenge-page.component').then((c) => c.ChallengePageComponent),
  },
];
