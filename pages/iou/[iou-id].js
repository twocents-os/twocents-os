import React from "react";
import { Box } from "@chakra-ui/react";
import iouService from "@src/services/iou";
import Head from "next/head";
import IOUPageView from "@src/pageviews/iou/[iou-id]";
import utils from "@src/services/utils.mjs";

export function IOUPage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: IOU</title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <IOUPageView iou={data.iou} />}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const iouId = context.query["iou-id"];

    const iou = await iouService.fetchIOUById(iouId);

    return {
      props: {
        data: { iou, iouId },
      },
    };
  } catch (error) {
    utils.logError(error, ["getServerSideProps", "IOUPage"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}
export default IOUPage;
