import { Paths } from '@configs/paths';
import { PageDefinition } from '@models/menu';

export const PAGES: PageDefinition[] = [
  {
    title: 'menu.home',
    path: Paths.HOME,
    icon: 'home',
  },
  {
    title: 'menu.pokemon',
    path: Paths.POKEMON,
    icon: 'catching_pokemon',
  },
  {
    title: 'menu.weather',
    path: Paths.WEATHER,
    icon: 'sunny',
  }
];
