import * as React from "react";
import { ReactNode } from "react";

export const makeCopies = (component: ReactNode, copies: number) => {
  return new Array(copies)
    .fill(null)
    .map((_, index) => React.cloneElement(component as any, { key: index }));
};

type Lis<C extends string, Val> = {
  [P in C]?: Val;
};

type TReturn<T extends string | undefined | boolean, Val> = T extends boolean
  ? (obj: Partial<Record<"True" | "False", Val>>) => Val
  : (obj: Lis<Exclude<T, undefined | boolean>, Val>) => Val;

export const bdMatchProp = <Val, T extends string | undefined | boolean>(
  val?: T,
  fallback?: any
): TReturn<T, Val> => {
  if (typeof val === "boolean") {
    const call: any = (obj: any) => {
      return val ? obj.True : obj.False;
    };
    return call;
  }
  const call: any = (obj: any) => {
    if (!val) {
      return fallback || null;
    }
    const result = obj[val];

    if (!result) {
      return fallback || null;
    }
    return result;
  };
  return call;
};
