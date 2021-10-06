import * as React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
function App({ Component }: AppProps) {
  return (
    <ChakraProvider>
      <Component />
    </ChakraProvider>
  );
}

export default App;
