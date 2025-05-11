import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';

import { map, Subject } from 'rxjs';

import {
  ColumnDefinition,
  PokemonTableComponent
} from '@features/pokemon/components/pokemon-table/pokemon-table.component';
import { PokemonQuery } from '@features/pokemon/state/pokemon.query';
import { PokemonService } from '@features/pokemon/state/pokemon.service';

const POKEMON_COLUMNS: ColumnDefinition[] = [
  { field: 'id', label: 'pokemon.table.id.label' },
  { field: 'name', label: 'pokemon.table.name.label', capitalize: true },
  { field: 'url', label: 'pokemon.table.url.label' },
];

const PAGE_SIZES = [5, 10, 20, 50, 100];

@Component({
  selector: 'fmc-pokemon-table-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    PokemonTableComponent,
  ],
  templateUrl: './pokemon-table-container.component.html',
  styleUrl: './pokemon-table-container.component.scss',
})
export class PokemonTableContainerComponent {
  readonly isLoading$ = this.pokemonQuery.isLoading$;
  readonly pokemons$ = this.pokemonQuery.pokemons$;
  readonly pageSize$ = this.pokemonQuery.pageSize$;
  readonly currentPage$ = this.pokemonQuery.currentPage$.pipe(map((page) => page - 1));
  readonly total$ = this.pokemonQuery.$total;

  readonly columnsDefinition: ColumnDefinition[] = POKEMON_COLUMNS;
  readonly pageSizes = PAGE_SIZES;

  private readonly pageEvent$ = new Subject<PageEvent>();

  constructor(
    private pokemonQuery: PokemonQuery,
    private pokemonService: PokemonService,
  ) {
    this.pokemonQuery.controllablePagination$.pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.pokemonService.fetchPokemons();
    });

    this.pageEvent$.pipe(
      takeUntilDestroyed(),
    ).subscribe((pageEvent) => {
      this.pokemonService.updatePagination(pageEvent);
    });
  }

  triggerPageEvent(pageEvent: PageEvent): void {
    this.pageEvent$.next(pageEvent);
  }
}
