import { createAction, payload } from '@ngneat/effects';

import { PaginationRequest, PaginationResourceList } from '@features/pokemon/models/pagination';
import { PokemonShorted, PokemonShortedResponse } from '@features/pokemon/models/pokemon';

const ACTION_PREFIX = '[Pokemon]';

export const reset = createAction(`${ ACTION_PREFIX } Reset Pokemon State`);

export const getPokemonPage = createAction(`${ ACTION_PREFIX } Get Pokemon Page`, payload<PaginationRequest>());
export const getPokemonPageSuccess = createAction(`${ ACTION_PREFIX } Get Pokemon Page Success`, payload<PaginationResourceList<PokemonShortedResponse>>());
export const getPokemonPageFail = createAction(`${ ACTION_PREFIX } Get Pokemon Page Fail`, payload<unknown>());
export const setPokemonPage = createAction(`${ ACTION_PREFIX } Set Pokemon Page`, payload<PaginationResourceList<PokemonShorted>>());
