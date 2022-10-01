import { QueryClient, QueryClientProvider } from "react-query";
import * as React from "react";
export const client = new QueryClient();

export const ReactQueryConfig: React.FC<{}> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
