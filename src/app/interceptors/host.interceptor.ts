import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

export const hostInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const url = req.url;
  if (url.includes('assets')) {
    return next(req);
  }

  const route = url.replace(/^\//, '');

  if (url.includes('pokemon')) {
    const pokemonAPI = environment.pokemonAPI.replace(/\/$/, '');
    return next(req.clone({ url: `${pokemonAPI}/${route}` }));
  }


  const weatherAPI = environment.weatherAPIURL.replace(/\/$/, '');
  return next(req.clone({ url: `${weatherAPI}/${route}` }));
};
