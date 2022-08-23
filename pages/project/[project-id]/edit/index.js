import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import projectService from "@src/services/project.mjs";
import { resetServerContext } from "react-beautiful-dnd";
import utils from "@src/services/utils.mjs";
import dynamic from "next/dynamic";
const ProjectEditPageView = dynamic(
  import("@src/pageviews/project/[project-id]/edit"),
  { ssr: false }
);

export function ProjectEditPage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: Edit Project </title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && <ProjectEditPageView project={data.project} />}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const projectId = context.query["project-id"];
    const project = await projectService.fetchProjectById(projectId);
    resetServerContext();

    return {
      props: {
        data: { projectId, project },
      },
    };
  } catch (error) {
    utils.logError(error, ["getServerSideProps", "ProjectEditPage"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}

export default ProjectEditPage;
