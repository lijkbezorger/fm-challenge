import { Environment, environment as prodEnvironment } from './environment.prod';

export const environment: Environment = {
  ...prodEnvironment,
  production: false,
  pokemonAPI: 'https://pokeapi.co/api/v2',
  weatherAPIURL: 'http://api.weatherapi.com/v1',
  weatherAPIKey: '', // Value should be inserted on CI level
};
