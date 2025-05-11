import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';

import { map, Subject } from 'rxjs';

import { TranslatePipe } from '@ngx-translate/core';

import { CapitalizePipe } from '@features/pokemon/pipes/capitalize.pipe';
import { PokemonQuery } from '@features/pokemon/state/pokemon.query';
import { PokemonService } from '@features/pokemon/state/pokemon.service';

interface ColumnDefinition {
  field: string;
  label: string;
  capitalize?: boolean;
}

const POKEMON_COLUMNS = [
  { field: 'id', label: 'pokemon.table.id.label' },
  { field: 'name', label: 'pokemon.table.name.label', capitalize: true },
  { field: 'url', label: 'pokemon.table.url.label' },
];
const PAGE_SIZES = [5, 10, 20, 50, 100];

@Component({
  selector: 'fmc-pokemon-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatPaginator,
    CapitalizePipe,
    AsyncPipe,
    TranslatePipe,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  readonly isLoading$ = this.pokemonQuery.isLoading$;
  readonly pokemons$ = this.pokemonQuery.pokemons$;
  readonly pageSize$ = this.pokemonQuery.pageSize$;
  readonly currentPage$ = this.pokemonQuery.currentPage$.pipe(map((page) => page - 1));
  readonly total$ = this.pokemonQuery.$total;

  readonly columns: ColumnDefinition[] = POKEMON_COLUMNS;
  readonly columnsConfig = POKEMON_COLUMNS.map((column) => column.field);
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
