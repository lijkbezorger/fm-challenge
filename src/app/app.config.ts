import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { hostInterceptor } from '@interceptors/host.interceptor';

import { provideAppInitialize } from '@providers/app-initialize.provider';
import { provideAppEffects } from '@providers/effects.provider';
import { provideTranslate } from '@providers/tranlsate.provider';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([hostInterceptor])),
    provideTranslate(),
    provideAppInitialize(),
    provideAppEffects(),
  ]
};
