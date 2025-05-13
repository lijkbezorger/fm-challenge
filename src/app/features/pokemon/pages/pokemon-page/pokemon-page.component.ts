import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  PokemonTableContainerComponent
} from '@features/pokemon/components/pokemon-table-container/pokemon-table-container.component';

@Component({
  selector: 'fmc-pokemon-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PokemonTableContainerComponent,
  ],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss'
})
export class PokemonPageComponent {}
