"use server";
import { cacheExchange, createClient, fetchExchange, gql } from "@urql/core";
import { AnyVariables, TypedDocumentNode } from "@urql/next";
import { registerUrql } from "@urql/next/rsc";

const makeClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_GRAPH_API_GOERLI as string,
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);

export async function getGraphQuery(
  query: TypedDocumentNode<any, AnyVariables>
) {

  const result = await getClient().query(query, {});
  return result.data;
}
