import { ActionCreator, ActionType, Typed } from 'ts-action';

export type PayloadActionCreator<T> = ActionCreator<string, (payload: T) => Typed<{ payload: T }, string>>;

export type PayloadAction<T> = ActionType<PayloadActionCreator<T>>;
