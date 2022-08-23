import React from "react";
import { Box } from "@chakra-ui/react";
import ProfilePageView from "@src/pageviews/people/[address]";
import Head from "next/head";
import utils from "@src/services/utils.mjs";

export function ProfilePage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: {data?.profile?.address}</title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && (
          <ProfilePageView
            profile={data.profile}
            initialAddress={data.address}
          />
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const address = context.query.address;
    return {
      props: {
        data: { address, profile: {} },
      },
    };
  } catch (error) {
    utils.logError(error, ["getServerSideProps", "ProfilePage"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}
export default ProfilePage;
