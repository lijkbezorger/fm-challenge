import { AsyncPipe } from '@angular/common';
import { HttpRequest } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

import { finalize, map, Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { TranslatePipe } from '@ngx-translate/core';

import { WeatherTableComponent } from '@features/weather/components/weather-table/weather-table.component';
import {
  Hour,
  HourUI,
  WeatherForecastColumnDefinition,
  WeatherForecastRequestShorted
} from '@features/weather/models/weather-api.models';
import { WeatherApiService } from '@features/weather/services/weather-api.service';

const FORECAST_COLUMNS: WeatherForecastColumnDefinition[] = [
  { field: 'date', label: 'weather.table.date.label', pipe: 'date' },
  { field: 'time', label: 'weather.table.time.label', pipe: 'time' },
  { field: 'temperature', label: 'weather.table.temperature.label' },
];

@Component({
  selector: 'fmc-challenge-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    WeatherTableComponent,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './challenge-page.component.html',
  styleUrl: './challenge-page.component.scss',
})
export class ChallengePageComponent implements OnInit {
  isLoading = signal<boolean>(true);
  hasErrors = signal<boolean>(false);

  weatherForcast$: Observable<HourUI[]> | undefined;

  readonly columnDefinitions = FORECAST_COLUMNS;

  constructor(private weatherApiService: WeatherApiService) {}

  ngOnInit(): void {
    const forecastRequestParams: WeatherForecastRequestShorted = {
      q: 'Vienna',
      days: 2,
      aqi: 'no',
      alerts: 'no',
    };

    this.isLoading.set(true);

    this.weatherForcast$ = this.weatherApiService.getWeatherForcast(forecastRequestParams).pipe(
      map(({ forecast }) => {
        return forecast.forecastday.reduce((acc, day) => {
          return [
            ...acc,
            ...day.hour,
          ]
        }, [] as Hour[])
      }),
      map((forecastHours) => forecastHours.map((forecastHour) => {
        return {
          date: forecastHour.time_epoch,
          time: forecastHour.time_epoch,
          temperature: forecastHour.temp_c,
        }
      })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      catchError((error: HttpRequest<unknown>) => {
        this.hasErrors.set(true);
        return of([]);
      }),
      finalize(() => {
        this.isLoading.set(false);
      })
    );
  }
}
