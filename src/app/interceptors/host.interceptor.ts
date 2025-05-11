import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

export const hostInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const url = req.url;
  if (url.includes('assets')) {
    return next(req);
  }

  const route = url.replace(/^\//, '');
  const host = environment.host.replace(/\/$/, '');

  return next(req.clone({ url: `${host}/${route}` }));
};
