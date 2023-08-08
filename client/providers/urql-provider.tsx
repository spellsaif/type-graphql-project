"use client";

import {
  UrqlProvider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from "@urql/next";

const ssr = ssrExchange();
const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, ssr, fetchExchange],
});

const URQLProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
};

export default URQLProvider;
