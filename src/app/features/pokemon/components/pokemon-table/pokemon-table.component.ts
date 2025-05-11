import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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

import { TranslatePipe } from '@ngx-translate/core';

import { PokemonShorted } from '@features/pokemon/models/pokemon';
import { CapitalizePipe } from '@features/pokemon/pipes/capitalize.pipe';

export interface ColumnDefinition {
  field: string;
  label: string;
  capitalize?: boolean;
}

@Component({
  selector: 'fmc-pokemon-table',
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
    TranslatePipe,
  ],
  templateUrl: './pokemon-table.component.html',
  styleUrl: './pokemon-table.component.scss',
})
export class PokemonTableComponent {
  readonly isLoading = input.required<boolean>();
  readonly pokemons = input.required<PokemonShorted[]>();
  readonly pageSize = input.required<number>();
  readonly currentPage = input.required<number>();
  readonly total = input.required<number>();
  readonly columnsDefinition = input.required<ColumnDefinition[]>();
  readonly pageSizes = input.required<number[]>();

  readonly pageEvent = output<PageEvent>();

  readonly columnsConfig = computed(() => this.columnsDefinition().map((column) => column.field));
}
