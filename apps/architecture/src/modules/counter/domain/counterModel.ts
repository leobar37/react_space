import { ICounter } from "./counterEntity";
import { immerable } from "immer";
export interface ICounterModel {
  increment(): void;
  decrement(): void;
  reset(): void;
}

export class Counter implements ICounter, ICounterModel {
  value!: number;
  [immerable] = true;

  constructor(val: number) {
    this.value = val;
  }

  increment(): void {
    this.value++;
  }
  decrement(): void {
    this.value--;
  }
  reset(): void {
    this.value = 0;
  }
}
