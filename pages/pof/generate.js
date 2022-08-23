import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import utils from "@src/services/utils.mjs";
import dynamic from "next/dynamic";
const POFGeneratePageView = dynamic(import("@src/pageviews/pof/generate"), {
  ssr: false,
});

export function POFGeneratePage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: Generate POF</title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <POFGeneratePageView />}
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
    utils.logError(error, ["getServerSideProps", "POFGeneratePage"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}
export default POFGeneratePage;
