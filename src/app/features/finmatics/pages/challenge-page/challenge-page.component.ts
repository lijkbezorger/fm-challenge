import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fmc-challenge-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './challenge-page.component.html',
  styleUrl: './challenge-page.component.scss',
})
export class ChallengePageComponent {

}
