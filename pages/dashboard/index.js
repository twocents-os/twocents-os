import React from "react";
import { Box, Button } from "@chakra-ui/react";
import Head from "next/head";
import DashboardPageView from "@src/pageviews/dashboard";
import utils from "@src/services/utils.mjs";

export function DashboardPage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: Dashboard</title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <DashboardPageView />}
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
    utils.logError(error, ["getServerSideProps", "DashboardPage"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}
export default DashboardPage;
