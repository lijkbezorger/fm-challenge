import { Routes } from '@angular/router';

import { Paths } from '@configs/paths';
import { FINMATICS_ROUTER } from '@features/finmatics/finmatics.routes';
import { POKEMON_ROUTER } from '@features/pokemon/pokemon.routes';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: Paths.HOME,
        loadComponent: () => import('./pages/home-page/home-page.component').then((c) => c.HomePageComponent),
      },
      ...POKEMON_ROUTER,
      ...FINMATICS_ROUTER
    ]
  }
];
