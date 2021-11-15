import React, { useEffect } from "react";
import { Column } from "react-table";
import { useUsers } from "../data";
import { Table } from "../Table";
import { ColTable } from "../Table";
import { Badge, Center, FormControl } from "@chakra-ui/react";
import { useToast, VStack, Button, Input, Text } from "@chakra-ui/react";
import { prepareCellProps, DefaultFilters } from "../utils";
import { User } from "../model";

import { UseFiltersColumnProps } from "react-table";
function Index() {
  const users = useUsers();
  const toast = useToast();
  const clickMe = (...props: any[]) => {
    toast({
      description: "Hello world",
      status: "success",
    });
    console.log(props[0].cell.row.original);
  };
  return (
    <Center w="100vw" h="100vh" bg="blue.600">
      <Table
        rowStyles={{
          cursor: "pointer",
          transition: "ease 0.2s",
          _hover: {
            bg: "gray.300",
            transform: "scale(1.03)",
          },
        }}
        bg="white"
        width="700px"
        borderRadius="10px"
        data={users}
      >
        {/* 
        
         Filters example : https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/filtering?file=/src/App.js
        */}
        <ColTable
          accessor="name"
          Filter={({
            column: { filterValue, preFilteredRows, setFilter },
          }: {
            column: UseFiltersColumnProps<User>;
          }) => {
            const count = preFilteredRows.length;
            return (
              <FormControl>
                <Input
                  placeholder={`search ${count} records`}
                  onChange={(e) => {
                    setFilter(e.target.value || undefined);
                  }}
                />
              </FormControl>
            );
          }}
          Header={({ column }) => {
            return (
              <>
                <Text my={2}>Username</Text>
                {column.render("Filter")}
              </>
            );
          }}
          filter={DefaultFilters.text}
        />
        <ColTable
          Header={({ column, data }) => {
            return <Badge>Email here {data.length}</Badge>;
          }}
          accessor="email"
          Cell={(props: any) => {
            const { value, original } = prepareCellProps<User>(props);
            return (
              <>
                <VStack>
                  <Badge>{value}</Badge>
                </VStack>
              </>
            );
          }}
        />
      </Table>
    </Center>
  );
}

export default Index;
