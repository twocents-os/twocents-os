import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import utils from "@src/services/utils.mjs";
import dynamic from "next/dynamic";
const ProfileEditPageView = dynamic(
  import("@src/pageviews/people/[address]/edit"),
  { ssr: false }
);

export function ProfileEditPage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: {data?.address}</title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <ProfileEditPageView address={data.address} />}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const address = context.query.address;

    return {
      props: {
        data: { address },
      },
    };
  } catch (error) {
    utils.logError(error, ["getServerSideProps", "ProfileEditPage"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}
export default ProfileEditPage;
