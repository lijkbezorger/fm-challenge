import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from '@angular/material/table';

import { TranslatePipe } from '@ngx-translate/core';

import { HourUI, WeatherForecastColumnDefinition } from '@features/weather/models/weather-api.models';
import { TimestampToDatePipe } from '@features/weather/pipes/timestamp-to-date.pipe';
import { TimestampToTimePipe } from '@features/weather/pipes/timestamp-to-time.pipe';

@Component({
  selector: 'fmc-weather-table',
  imports: [
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    TranslatePipe,
    MatColumnDef,
    MatHeaderCellDef,
    TimestampToTimePipe,
    TimestampToDatePipe,
  ],
  templateUrl: './weather-table.component.html',
  styleUrl: './weather-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherTableComponent {
  readonly hoursForecast = input.required<HourUI[]>();
  readonly isLoading = input.required<boolean>();
  readonly columnsDefinition = input.required<WeatherForecastColumnDefinition[]>();

  readonly columnsConfig = computed(() => this.columnsDefinition().map((column) => column.field));
}
