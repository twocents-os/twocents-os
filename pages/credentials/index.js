import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import CredentialsPageView from "@src/pageviews/credentials/credentials";
import utils from "@src/services/utils.mjs";
import repository, { COLLECTIONS } from "@src/services/repository.mjs";

export function CredentialPage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: Credentials </title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <CredentialsPageView users={data.users} />}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { searchTerm } = context.query;
    const searchRegex = new RegExp(`.*${searchTerm}.*`, "i");
    const filter = {
      $or: [
        { contributions: searchRegex },
        { credentialDescription: searchRegex },
        { credentialSubject: searchRegex },
        { skills: searchRegex },
      ],
    };

    const query = [
      {
        $match: filter,
      },

      {
        $group: {
          _id: "$recipientAddress",
          count: { $count: {} },
          credentials: { $push: "$$ROOT" },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "address",
          as: "user",
        },
      },
      {
        $sort: { count: -1 },
      },
    ];

    const users = await repository.aggregateQuery(
      COLLECTIONS.CREDENTIALS,
      query
    );

    return {
      props: {
        data: {
          users,
        },
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
