import { Box, Flex, Container } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useApi } from "@src/shared/api";
import { usePageState } from "@src/shared/state";
import HeroSection from "@src/pageviews/project/[project-id]/view/HeroSection";
import ProjectInfoSection from "@src/pageviews/project/[project-id]/view/ProjectInfoSection";
import InterestedInProjectSection from "@src/pageviews/project/[project-id]/view/InterestedInProjectSection";
import ProjectTabsSection from "@src/pageviews/project/[project-id]/view/ProjectTabsSection";
import ProjectOwnerSection from "@src/pageviews/project/[project-id]/view/ProjectOwnerSection";
import ProjectLinksSection from "@src/pageviews/project/[project-id]/view/ProjectLinksSection";
import ManageYourProject from "@src/pageviews/project/[project-id]/view/ManageYourProject";
import POFListSection from "@src/pageviews/project/[project-id]/view/POFListSection";
import useErrorHandler from "@src/shared/error/useErrorHandler";

function ProjectPageView({ projectId, project, pofList, _feedbacks }) {
  const errorHandler = useErrorHandler();
  const placeTag = "project-pageview";
  const api = useApi();
  const [state] = usePageState();
  const [feedbacks, setFeedbacks] = useState(_feedbacks || []);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchOwnerProfile = async () => {
      try {
        const response = await api.call(
          "get",
          `/api/profiles/fetch-project-owner-profile?projectId=${projectId}`
        );
        setProfile(response.profile);
      } catch (error) {
        errorHandler(error, [placeTag]);
      }
    };
    fetchOwnerProfile();
  }, []);

  const submitFeedback = async (feedback) => {
    try {
      const response = await api.call("post", `/api/projects/submit-feedback`, {
        ...feedback,
        projectId,
        submittedBy: state.currentAddress.toLowerCase(),
        isAnonym: false,
      });
      setFeedbacks([response.feedback, ...feedbacks]);
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  return (
    <Container maxW={"6xl"} mb="140px">
      <HeroSection project={project} />
      <Flex flexDir={["column", "column", "row"]}>
        <Flex flexGrow={1} flexDir={"column"} mr={["unset", "unset", "30px"]}>
          <ManageYourProject profile={profile} />
          <Box pr="5px" borderRight={["unset", "unset", "1px solid #D7D7D7"]}>
            <ProjectOwnerSection
              profile={profile}
              mt="24px"
              display={["block", "block", "none"]}
            />
            <ProjectInfoSection project={project} mt="20px" />
            <InterestedInProjectSection submitFeedback={submitFeedback} />
            <ProjectLinksSection
              project={project}
              display={["block", "block", "none"]}
              mt="24px"
            />
            {/* <ProjectTabsSection
            mt="56px"
            feedbacks={feedbacks}
            submitFeedback={submitFeedback}
          /> */}
            <POFListSection pofList={pofList} mt="40px" />
          </Box>
        </Flex>

        <Box mt="32px" minW={"300px"} display={["none", "none", "block"]}>
          <ProjectOwnerSection profile={profile} project={project} />
          <ProjectLinksSection project={project} />
        </Box>
      </Flex>
    </Container>
  );
}

export default ProjectPageView;
