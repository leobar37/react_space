import type { AppProps } from "next/app";
import "../styles/global.scss";
import { ReactQueryConfig } from "@app/lib";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryConfig>
      <Component {...pageProps} />
    </ReactQueryConfig>
  );
}

export default MyApp;
