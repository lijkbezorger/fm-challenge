import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { PAGES } from '@configs/menu';

@Component({
  selector: 'fmc-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatList,
    MatListItem,
    TranslatePipe,
    MatListItemTitle,
    RouterLink,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  readonly pages = PAGES;
}
