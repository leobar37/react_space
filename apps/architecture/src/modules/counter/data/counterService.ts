import type { ICounter } from "../domain/counterEntity";
import { Counter } from "../domain/counterModel";
import { plainToClass } from "class-transformer";

let count = 0;

function getCounter(): Promise<Counter> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(plainToClass(Counter, { value: count } as ICounter));
    }, 3000);
  });
}

export { getCounter };
