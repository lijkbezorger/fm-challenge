import { inject, provideAppInitializer } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Actions } from '@ngneat/effects-ng';
import { devTools } from '@ngneat/elf-devtools';

import { environment } from '@environments/environment';

export const provideAppInitialize = () =>
  provideAppInitializer(() => {
    // Translate
    const translateService = inject(TranslateService);
    translateService.addLangs(['de', 'en']);
    translateService.setDefaultLang('de');
    translateService.use('de');

    // Elf DevTools
    if (!environment.production) {
      const actions = inject(Actions);
      devTools({
        name: 'FMC Elf Devtools',
        actionsDispatcher: actions,
      })
    }
  });
