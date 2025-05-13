import { Routes } from '@angular/router';

import { Paths } from '@configs/paths';
import { POKEMON_ROUTER } from '@features/pokemon/pokemon.routes';
import { WEATHER_ROUTER } from '@features/weather/weather.routes';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: Paths.HOME,
        loadComponent: () => import('./pages/home-page/home-page.component').then((c) => c.HomePageComponent),
      },
      ...POKEMON_ROUTER,
      ...WEATHER_ROUTER
    ]
  }
];
