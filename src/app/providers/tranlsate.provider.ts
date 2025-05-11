import { HttpClient } from '@angular/common/http';
import { importProvidersFrom, makeEnvironmentProviders } from '@angular/core';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const httpLoaderFactory: (httpClient: HttpClient) => TranslateHttpLoader =
  (httpClient: HttpClient) => new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');

export const provideTranslate = () =>
  makeEnvironmentProviders([
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ])
  ]);
