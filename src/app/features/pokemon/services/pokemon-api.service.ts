import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PaginationRequest, PaginationResourceList } from '@features/pokemon/models/pagination';
import { PokemonShortedResponse } from '@features/pokemon/models/pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonApiService {
  constructor(private http: HttpClient) {}

  getPokemons(params: PaginationRequest): Observable<PaginationResourceList<PokemonShortedResponse>> {
    return this.http.get<PaginationResourceList<PokemonShortedResponse>>('/pokemon', { params: { ...params } });
  }
}
