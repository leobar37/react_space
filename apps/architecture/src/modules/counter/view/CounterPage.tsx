import React from "react";
import { HStack, Center, Button, Heading, VStack } from "@chakra-ui/react";
import { useCounterController } from "../controller/conterViewModel";
function CounterPage() {
  const { loading, count, decrement, increment, reset } =
    useCounterController();
  if (loading) {
    return <Heading>loading..</Heading>;
  }

  return (
    <Center flexDirection="column" w="100vw" bg="blue.600" h="100vh">
      <VStack spacing={4}>
        <Heading color="white">{count}</Heading>
        <HStack>
          <Button onClick={increment}>+</Button>
          <Button onClick={reset}>reset</Button>
          <Button onClick={decrement}>-</Button>
        </HStack>
      </VStack>
    </Center>
  );
}

export default CounterPage;
