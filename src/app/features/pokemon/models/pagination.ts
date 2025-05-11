export interface PaginationRequest {
  limit: number;
  offset: number;
}

export interface PaginationResourceList<T = object> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
