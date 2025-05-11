import { Routes } from '@angular/router';

import { Paths } from '@configs/paths';

export const FINMATICS_ROUTER: Routes = [
  {
    path: Paths.FINMATICS,
    loadComponent: () => import('./pages/challenge-page/challenge-page.component').then((c) => c.ChallengePageComponent),
  },
];
