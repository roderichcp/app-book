import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'book-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

}