import type { Counter, ICounterModel } from "./counterModel";

export interface CounterStore extends ICounterModel {
  counter: Counter | undefined;
  isLoading: boolean;
  isUpdating: boolean;

  loadInitialCounter(): Promise<Counter>;
  setCounter(counter: Counter): void;
}
