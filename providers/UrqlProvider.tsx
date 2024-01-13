"use client";

import { useMemo } from "react";
import {
  UrqlProvider as Provider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from "@urql/next";

export default function UrqlProvider({ children }: React.PropsWithChildren) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: process.env.NEXT_PUBLIC_GRAPH_API_GOERLI as string,
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
    });

    return [client, ssr];
  }, []);

  return (
    <Provider client={client} ssr={ssr}>
      {children}
    </Provider>
  );
}
