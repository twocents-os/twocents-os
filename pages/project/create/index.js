import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import ProjectCreatePageView from "@src/pageviews/project/create";

export function ProjectCreatePage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: Create Project </title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <ProjectCreatePageView />}
      </Box>
    </>
  );
}

export default ProjectCreatePage;
