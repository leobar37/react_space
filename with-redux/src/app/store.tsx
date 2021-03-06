import { configureStore } from "@reduxjs/toolkit";

export function makeStore() {
  return configureStore({
    reducer: {},
  });
}

const store = makeStore();

export type AppStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
