"use client";

import { gql, useQuery } from "@urql/next";

const HelloQuery = gql`
  query {
    hello
  }
`;

export default function Home() {
  const [result] = useQuery({ query: HelloQuery });
  return <main>{result.data?.hello}</main>;
}
