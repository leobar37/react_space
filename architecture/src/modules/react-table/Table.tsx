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
} from "react-table";
import React, {
  FunctionComponent,
  ReactChildren,
  ReactNode,
  useMemo,
  useState,
} from "react";

// make data
type ChildrenFunc = (node: ReactChildren) => ReactNode;

type TableColumn = {
  //  original column used by react-taBLE
  column: Column;
};

export type TableProps = {
  data: any[];
  rowStyles?: SystemStyleObject | ChildrenFunc;
} & CTableProps;

type TableContextProps = {
  pushColumn: (col: TableColumn) => void;
};

const TableContext = React.createContext<TableContextProps>(undefined!);

const ProviderTable = TableContext.Provider;

const useTableContext = () => {
  const content = React.useContext(TableContext);
  if (!content) {
    throw new Error("Undefined");
  }
  return content;
};

// tr styles
// custom cell rendersÇ
type ColTableProps = {
  title: string;
  name: string;
  cell?: Renderer<CellProps<any, any>>;
  id?: string;
};

export const ColTable = (props: ColTableProps) => {
  const { pushColumn } = useTableContext();

  console.log(pushColumn);

  pushColumn({
    column: {
      Cell: props.cell,
      Header: props.name,
      accessor: props.key,
      id: props.id,
    },
  });
  return null;
};

export const Table: FunctionComponent<TableProps> = ({
  data,
  children,
  ...rest
}) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    getHooks,
    state,
  } = useTable({ data, columns }, useFilters, useGlobalFilter);

  const pushColumn = (col: TableColumn) => {
    columns.push(col.column);
    setColumns(columns);
  };

  return (
    <ProviderTable value={{ pushColumn: pushColumn }}>
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
              <Tr {...row.getRowProps()} key={i}>
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
          {/* Registers */}
        </Tbody>
      </ChacrakTable>
      {children}
    </ProviderTable>
  );
};
