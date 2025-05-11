import { makeEnvironmentProviders } from '@angular/core';

import { provideEffects, provideEffectsManager } from '@ngneat/effects-ng';

import { PokemonEffects } from '@features/pokemon/state/pokemon.effects';

export const provideAppEffects = () =>
  makeEnvironmentProviders([
    provideEffectsManager({ dispatchByDefault: true }),
    provideEffects(
      PokemonEffects,
    ),
  ]);
