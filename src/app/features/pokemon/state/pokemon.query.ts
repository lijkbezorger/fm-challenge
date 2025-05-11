import { Injectable } from '@angular/core';

import { distinctUntilChanged } from 'rxjs';

import { select } from '@ngneat/elf';
import { selectAllEntities } from '@ngneat/elf-entities';

import { PokemonStore } from '@features/pokemon/state/pokemon.store';

@Injectable({ providedIn: 'root' })
export class PokemonQuery {
  readonly isLoading$ = this.pokemonStore.store.pipe(
    select((state) => state.isLoading)
  );

  readonly pokemons$ = this.pokemonStore.store.pipe(selectAllEntities());

  readonly controllablePagination$ = this.pokemonStore.store.pipe(
    select(({ perPage, currentPage }) => ({ perPage, currentPage })),
    distinctUntilChanged((previous, current) => {
      return previous.currentPage === current.currentPage && previous.perPage === current.perPage;
    }),
  );

  readonly pageSize$ = this.pokemonStore.store.pipe(
    select((state) => state.perPage),
  );

  readonly currentPage$ = this.pokemonStore.store.pipe(
    select((state) => state.currentPage),
  );

  readonly $total = this.pokemonStore.store.pipe(
    select((state) => state.total),
  );

  constructor(private pokemonStore: PokemonStore) {
  }

  getControllerPagination() {
    const { perPage, currentPage } = this.pokemonStore.store.getValue();
    return { perPage, currentPage };
  }
}
