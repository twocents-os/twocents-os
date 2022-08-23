import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";
import ProjectList from "@src/pageviews/people/[address]/ProfileTabSection/ProjectList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";

const ProjectListWrapper = ({ projects, ...props }) => {
  if (!projects || projects.length === 0) {
    return null;
  }
  return (
    <Box {...props}>
      <Flex justifyContent={"start"} alignItems="center" mb="24px">
        <FontAwesomeIcon icon={faRectangleList} color="#0057B7" size="lg" />
        <Text fontWeight={700} fontSize={"20px"} color="#0057B7" ml="10px">
          Join my projects
        </Text>
      </Flex>
      <ProjectList projects={projects} mt="24px" />
    </Box>
  );
};

export default ProjectListWrapper;
