export interface EntitiesStoreDef<T, ID extends number | string> {
  entities: Record<ID, T>;
  ids: ID[];
}

export interface EntitiesStoreConfig<ID extends number | string> {
  ids: ID[];
}
