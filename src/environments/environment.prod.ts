export const environment = {
  production: true,
  pokemonAPI: window.location.origin,
  weatherAPIURL: 'http://api.weatherapi.com/v1',
  weatherAPIKey: '', // Value should be inserted on CI level
};

export type Environment = typeof environment;
