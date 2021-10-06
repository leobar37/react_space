import { CounterStore } from "@app/modules/counter/domain";
import { Counter } from "@app/modules/counter/domain";
import create from "zustand";
import { getCounter } from "./counterService";
import { curry } from "lodash";

import produce from "immer";

type Caller = () => CounterStore;
const createUpdater = curry(
  (resStore: CounterStore | Caller, update: (counter: Counter) => void) => {
    const store = typeof resStore == "function" ? resStore() : resStore;
    if (!store.counter) {
      throw new Error("Counter element not provided");
    }
    const counter = produce(store.counter!, (counter) => update(counter));
    store.setCounter(counter);
  }
);

export const useCounterStore = create<CounterStore>((set, get) => {
  const updater = createUpdater(get);
  const store = {
    counter: undefined,
    isLoading: false,
    isUpdating: false,
    loadInitialCounter: async () => {
      const counter = await getCounter();
      get().setCounter(counter);
      return counter;
    },
    setCounter: (counter: Counter) => {
      set({ counter });
    },
    increment: () => {
      updater((counter) => {
        counter.increment();
      });
    },
    decrement: () => {
      updater((counter) => {
        counter.decrement();
      });
    },

    reset: () => {
      updater((counter) => {
        counter.reset();
      });
    },
  };

  return store;
});
