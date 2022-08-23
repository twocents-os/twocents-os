import React from "react";
import { Box } from "@chakra-ui/react";
import pofService from "@src/services/pof.mjs";
import Head from "next/head";
import POFPageView from "@src/pageviews/pof/[pof-id]";
import utils from "@src/services/utils.mjs";

export function POFPage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: POF</title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <POFPageView pof={data.pof} />}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const pofId = context.query["pof-id"];

    const pof = await pofService.fetchPOFById(pofId);

    return {
      props: {
        data: { pof, pofId },
      },
    };
  } catch (error) {
    utils.logError(error, ["getServerSideProps", "POFPage"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}
export default POFPage;
