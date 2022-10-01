import {
  Table as ChacrakTable,
  Thead,
  Tbody,
  Th,
  Tr,
  TableProps as CTableProps,
  Td,
  SystemStyleObject,
} from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-utils";
import {
  useTable,
  Column,
  useFilters,
  useGlobalFilter,
  TableInstance,
  CellProps,
  Renderer,
  FilterProps,
  UseFiltersInstanceProps,
  UseTableInstanceProps,
  UseGlobalFiltersInstanceProps,
  UseFiltersColumnOptions,
} from "react-table";

/**
 * see : https://github.dev/react-component/util
 */
import React, {
  FunctionComponent,
  ReactChildren,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from "react";
import { convertChildrenToColumns } from "./utils";
// make data
type ChildrenFunc = (node: ReactChildren) => ReactNode;

export type TableInstanceProps = UseGlobalFiltersInstanceProps<any> &
  UseTableInstanceProps<any>;

export type FilterGlobalProps = Pick<
  UseGlobalFiltersInstanceProps<any>,
  "preGlobalFilteredRows" | "setGlobalFilter"
> & {
  globalFilter: any;
};

export type TableProps = {
  data: any[];
  rowStyles?: SystemStyleObject | ChildrenFunc;
  onTable?: (table: TableInstanceProps) => void;
} & CTableProps;

type ColTableProps = {} & Column & UseFiltersColumnOptions<any>;

/**
 * This is a syntatic sugar for 'columns' prop
 */
export const ColTable: FunctionComponent<ColTableProps> = (props) => {
  return null;
};

export const Table: FunctionComponent<TableProps> = ({
  data,
  children,
  rowStyles,
  onTable,
  ...rest
}) => {
  const columns = React.useMemo(
    () => convertChildrenToColumns(children as ReactChildren),
    [children]
  );

  const props = useTable({ data, columns }, useFilters, useGlobalFilter);
  let stylesRow: SystemStyleObject | null = null;
  if (typeof rowStyles == "object") {
    stylesRow = rowStyles;
  }

  useEffect(() => {
    console.log("called on tablle");
    if (onTable) {
      onTable(props as any as TableInstanceProps);
    }
  }, [props, onTable]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    getHooks,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = props as any as TableInstanceProps;

  return (
    <ChacrakTable {...getTableProps()} {...rest}>
      <Thead>
        {headerGroups.map((headerGroup, i) => {
          return (
            <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => {
                return (
                  <Th {...column.getHeaderProps()} key={j}>
                    {column.render("Header")}
                  </Th>
                );
              })}
            </Tr>
          );
        })}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr sx={stylesRow || {}} {...row.getRowProps()} key={i}>
              {row.cells.map((cell, j) => {
                return (
                  <Td {...cell.getCellProps()} key={j}>
                    {cell.render("Cell")}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </ChacrakTable>
  );
};
