import React from "react";
import { Column } from "react-table";
import { useUsers } from "../data";
import { Table } from "../Table";
import { ColTable } from "../Table";
import { Badge, Center } from "@chakra-ui/react";

function Index() {
  const users = useUsers();
  return (
    <Center w="100vw" h="100vh" bg="blue.600">
      <Table
        bg="white"
        width="700px"
        borderRadius="10px"
        // columns={columns}
        data={users}
      />
      <ColTable title="Nombre" name="name" />
      <ColTable title="Usuario" name="username" />
      <ColTable
        title="email"
        name="email"
        cell={({ value }) => {
          return <Badge>{value}</Badge>;
        }}
      />
    </Center>
  );
}

export default Index;
