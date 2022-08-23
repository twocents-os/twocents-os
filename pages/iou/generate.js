import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import utils from "@src/services/utils.mjs";
import dynamic from "next/dynamic";
const IOUGeneratePageView = dynamic(import("@src/pageviews/iou/generate"), {
  ssr: false,
});

export function IOUGeneratePage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: Generate IOU</title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <IOUGeneratePageView />}
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
    utils.logError(error, ["getServerSideProps", "IOUGeneratePage"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}
export default IOUGeneratePage;
