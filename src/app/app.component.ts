import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';

@Component({
  selector: 'fmc-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
