import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Actions } from '@ngneat/effects-ng';

import { getPokemonPage } from '@features/pokemon/state/pokemon.actions';
import { PokemonQuery } from '@features/pokemon/state/pokemon.query';
import { PokemonStore } from '@features/pokemon/state/pokemon.store';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(
    private actions: Actions,
    private pokemonStore: PokemonStore,
    private pokemonQuery: PokemonQuery,
  ) {}

  fetchPokemons(): void {
    const paginationData = this.pokemonQuery.getControllerPagination();

    this.actions.dispatch(getPokemonPage({
      limit: paginationData.perPage,
      offset: (paginationData.currentPage - 1) * paginationData.perPage,
    }));
  }

  updatePagination(page: PageEvent): void {
    this.pokemonStore.updateControllablePagination({
      currentPage: page.pageIndex + 1,
      perPage: page.pageSize,
    });
  }
}
