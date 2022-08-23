import React from "react";
import { Box } from "@chakra-ui/react";
import iouService from "@src/services/iou";
import Head from "next/head";
import IOUReceiverPageView from "@src/pageviews/iou/receiver/[iou-id]";
import utils from "@src/services/utils.mjs";

export function IOUReceiver({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: Receive IOU</title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <IOUReceiverPageView iou={data.iou} />}
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
    utils.logError(error, ["getServerSideProps", "IOUReceiver"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}
export default IOUReceiver;
