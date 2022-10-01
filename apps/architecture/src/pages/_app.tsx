import * as React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();
function App({ Component }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <Component />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
