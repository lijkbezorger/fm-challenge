export interface WeatherForecastRequest {
  key: string;
  q: string;
  days: number;
  aqi: 'yes' | 'no';
  alerts: 'yes' | 'no';
}

export type WeatherForecastRequestShorted = Omit<WeatherForecastRequest, 'key'>;


export interface Day {
  avgtemp_c: number;
}

export interface Hour {
  time_epoch: number,
  time: string,
  temp_c: number,
}

export interface HourUI {
  date: number,
  time: number,
  temperature: number,
}

export interface ForecastDayInfo {
  date: string;
  date_epoch: number;
  day: Day;
  hour: Hour[]
}

export interface ForecastResponse {
  forecast: {
    forecastday: ForecastDayInfo[]
  }
}


export interface WeatherForecastColumnDefinition {
  field: string;
  label: string;
  pipe?: 'date' | 'time';
}
