import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment.prod';
import { ForecastResponse, WeatherForecastRequest } from '@features/weather/models/weather-api.models';


@Injectable({ providedIn: 'root' })
export class WeatherApiService {
  constructor(private httpClient: HttpClient) {
  }

  getWeatherForcast(params: Omit<WeatherForecastRequest, 'key'>): Observable<ForecastResponse> {
    const stringifiedParams = this.prepareForecastParams(params);

    return this.httpClient.get<ForecastResponse>(`/forecast.json?${ stringifiedParams }`);
  }

  private prepareForecastParams(params: Omit<WeatherForecastRequest, 'key'>): string {
    const fullfiledParams = {
      ...params,
      key: environment.weatherAPIKey,
    };

    return Object.entries(fullfiledParams)
      .reduce((acc, [paramName, paramValue]) => {
        return [
          ...acc,
          `${ paramName }=${ paramValue }`
        ];
      }, [] as string[])
      .join('&');
  }
}
