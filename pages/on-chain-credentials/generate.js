import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import utils from "@src/services/utils.mjs";
import dynamic from "next/dynamic";
const OnChangeCredentialsGeneratePageView = dynamic(
  import("@src/pageviews/on-chain-credentials/generate"),
  {
    ssr: false,
  }
);

export function OnChangeCredentialsGeneratePage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: Generate On Chain Credentials</title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <OnChangeCredentialsGeneratePageView />}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    return {
      props: {
        data: {},
      },
    };
  } catch (error) {
    utils.logError(
      error,
      ["getServerSideProps", "OnChangeCredentialsGeneratePage"],
      {
        contextQuery: context?.query,
      }
    );
    return { props: { error: error.message } };
  }
}
export default OnChangeCredentialsGeneratePage;
