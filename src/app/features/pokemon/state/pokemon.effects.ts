import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { map, tap } from 'rxjs';

import { createEffect, ofType, toPayload } from '@ngneat/effects';
import { Actions } from '@ngneat/effects-ng';
import { emitOnce } from '@ngneat/elf';

import { PokemonApiService } from '@features/pokemon/services/pokemon-api.service';
import {
  getPokemonPage,
  getPokemonPageFail,
  getPokemonPageSuccess, reset,
  setPokemonPage
} from '@features/pokemon/state/pokemon.actions';
import { PokemonStore } from '@features/pokemon/state/pokemon.store';
import { createRequestEffect } from '@utils/elf/create-request-effect';

@Injectable({ providedIn: 'root' })
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private pokemonStore: PokemonStore,
    private pokemonApi: PokemonApiService,
  ) {
  }

  getPokemonPage$ = createRequestEffect(
    {
      actions: this.actions$,
      init: getPokemonPage,
      success: getPokemonPageSuccess,
      fail: getPokemonPageFail,
      handler: ({ payload }) => {
        this.pokemonStore.setIsLoading(true);
        return this.pokemonApi.getPokemons(payload);
      },
    },
    { dispatch: true },
  );

  getPokemonPageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPokemonPageSuccess),
        toPayload(),
        tap(() => {
          this.pokemonStore.setIsLoading(false);
        }),
        map((response) => {
          const shortedPokemons = response.results.map((pokemon) => ({
            id: +pokemon.url.split('/').slice(-2)[0],
            name: pokemon.name,
            url: pokemon.url,
          }));
          return setPokemonPage({ ...response, results: shortedPokemons });
        })
      ),
    { dispatch: true },
  );

  getPokemonPageFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPokemonPageFail),
        tap(() => {
          this.snackBar.open(
            'Pokemon loading failed',
          );
          this.pokemonStore.setIsLoading(false);
        }),
        map(() => reset())
      ),
    { dispatch: true },
  );

  setPokemonPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setPokemonPage),
        toPayload(),
        tap((response) => {
          emitOnce(() => {
            this.pokemonStore.setIsLoading(false);
            this.pokemonStore.setEntities(response.results);
            this.pokemonStore.updateUncontrollablePagination(response.count);
          });
        }),
      ),
    { dispatch: false },
  );

  reset$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(reset),
        tap(() => {

          this.pokemonStore.reset();
        }),
      ),
    { dispatch: false },
  );
}
