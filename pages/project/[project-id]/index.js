import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import ProjectPageView from "@src/pageviews/project/[project-id]";
import projectService from "@src/services/project.mjs";
import pofService from "@src/services/pof.mjs";
import utils from "@src/services/utils.mjs";

export function ProjectPage({ data, error }) {
  return (
    <>
      <Head>
        <title>TwoCents: {data?.projectId} </title>
      </Head>
      <Box>
        {error && <Box>Something went wrong: {error}</Box>}
        {!error && (
          <ProjectPageView
            projectId={data.projectId}
            project={data.project}
            pofList={data.pofList}
            _feedbacks={data.feedbacks}
          />
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const projectId = context.query["project-id"];
    const project = await projectService.fetchProjectById(projectId);
    const pofList = await pofService.fetchAcceptedPOFsByProjectId(projectId);
    const feedbacks = await projectService.fetchFeedbacksByProjectId(projectId);

    return {
      props: {
        data: { projectId, project, pofList, feedbacks },
      },
    };
  } catch (error) {
    utils.logError(error, ["getServerSideProps", "ProjectPage"], {
      contextQuery: context?.query,
    });
    return { props: { error: error.message } };
  }
}
export default ProjectPage;
