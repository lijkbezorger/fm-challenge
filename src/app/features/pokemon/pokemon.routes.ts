import { Routes } from '@angular/router';

import { Paths } from '@configs/paths';

export const POKEMON_ROUTER: Routes = [
  {
    path: Paths.POKEMON,
    loadComponent: () => import('./pages/pokemon-page/pokemon-page.component').then((c) => c.PokemonPageComponent),
  },
];
