import { Injectable } from '@angular/core';

import { createStore, setProp, setProps, Store, withProps } from '@ngneat/elf';
import { addEntities, deleteAllEntities, withEntities } from '@ngneat/elf-entities';

import { PokemonShorted } from '@features/pokemon/models/pokemon';
import { EntitiesStoreConfig, EntitiesStoreDef } from '@models/elf';

interface PokemonStoreProps {
  isLoading: boolean;
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

type PokemonState = PokemonStoreProps & EntitiesStoreDef<PokemonShorted, number>;

type PokemonStoreType = Store<
  {
    name: string;
    state: PokemonState;
    config: EntitiesStoreConfig<number>,
  },
  PokemonState
>;

@Injectable({ providedIn: 'root' })
export class PokemonStore {
  get store(): PokemonStoreType {
    return this._store;
  }

  readonly _store: PokemonStoreType;

  constructor() {
    this._store = createStore(
      { name: 'Pokemon' },
      withEntities<PokemonShorted>({ idKey: 'id' }),
      withProps<PokemonStoreProps>({
        isLoading: true,
        currentPage: 1,
        lastPage: Infinity,
        perPage: 5,
        total: 0,
      }),
    );
  }

  reset(): void {
    this._store.reset();
  }

  setIsLoading(isLoading: boolean): void {
    this._store.update(setProp('isLoading', isLoading));
  }

  updateUncontrollablePagination(total: number): void {
    this._store.update(setProps((state) => ({
        ...state,
        lastPage: Math.ceil(total / state.perPage),
        total,
      })
    ));
  }

  setEntities(pokemons: PokemonShorted[]): void {
    this._store.update(deleteAllEntities());
    this._store.update(addEntities(pokemons));
  }

  updateControllablePagination({ currentPage, perPage }: Pick<PokemonStoreProps, 'currentPage' | 'perPage'>): void {
    this._store.update(setProps((state) => ({
        ...state, currentPage, perPage
      })
    ));
  }
}
