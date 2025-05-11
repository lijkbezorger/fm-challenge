import { Observable, of } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';

import { createEffect, Effect, ofType } from '@ngneat/effects';
import { Actions } from '@ngneat/effects-ng';

import { PayloadAction, PayloadActionCreator } from '@models/effects';

export function createRequestEffect<Payload, Response, Error>(
  options: {
    actions: Actions;
    init: PayloadActionCreator<Payload>;
    success: PayloadActionCreator<Response>;
    fail: PayloadActionCreator<Error>;
    handler: (action: PayloadAction<Payload>) => Observable<Response>;
  },
  config: { dispatch: true },
): Effect<({ payload: Response } & { type: string }) | ({ payload: Error } & { type: string })> {
  const { actions, init, success, fail, handler } = options;

  return createEffect(
    () =>
      actions.pipe(
        ofType(init),
        mergeMap((action) =>
          handler(action).pipe(
            map((payload) => success(payload)),
            catchError((err) => of(fail(err))),
          )),
      ),
    config,
  );
}
