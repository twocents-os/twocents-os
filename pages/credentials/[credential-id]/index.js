import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import CredentialPageView from "@src/pageviews/credentials/[credential-id]";
import utils from "@src/services/utils.mjs";
import repository, { COLLECTIONS } from "@src/services/repository.mjs";

export function CredentialPage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: {data?.credentialId} </title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && (
          <CredentialPageView
            credentialId={data.credentialId}
            credential={data.credential}
          />
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const credentialId = context.query["credential-id"];
    const credential = await repository.findOneDoc(COLLECTIONS.CREDENTIALS, {
      _id: credentialId,
    });

    return {
      props: {
        data: { credentialId, credential },
      },
    };
  } catch (error) {
    utils.logError(error, ["getServerSideProps", "CredentialPage"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}
export default CredentialPage;
