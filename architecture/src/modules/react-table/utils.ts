import { toArray } from "@app/utils/react-utils";
import * as React from "react";
import { Column, CellProps } from "react-table";

/**
 * see : https://github.com/tannerlinsley/react-table/blob/master/src/filterTypes.js
 */
export enum DefaultFilters {
  text = "text",
  exactText = "exactText",
  exactTextCase = "exactTextCase",
  includes = "includes",
  includesAl = "includesAl",
  includesSome = "includesSome",
  includesValue = "includesValue",
  exact = "exact",
  equals = "equals",
  between = "between",
}

/**
 *
 * @description
 * Giving a child this function return a array of data in column table
 */
export const convertChildrenToColumns = (children: React.ReactChildren) => {
  return toArray(children)
    .filter((node) => React.isValidElement(node))
    .map(({ key, props, type }: React.ReactElement) => {
      console.log("los a type");
      console.log((type as any)());

      const { children, ...restProps } = props;
      const column = {
        ...restProps,
      };
      return column;
    }) as unknown as Column[];
};

export const prepareCellProps = <D extends object>(props: CellProps<D>) => {
  return {
    ...props,
    original: props.cell.row.original,
  };
};
