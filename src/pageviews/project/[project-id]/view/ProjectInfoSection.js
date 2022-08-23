import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";

const ProjectInfoSection = ({ project, ...props }) => {
  return (
    <Box {...props}>
      <Flex alignItems={["flex-start", "flex-start", "center"]} flexWrap="wrap">
        <Box>
          <Text fontWeight={700} fontSize={"24px"}>
            {project.name}
          </Text>
        </Box>
        <Box ml={"10px"}>
          <Text fontWeight={700} fontSize={"24px"}>
            {project.tag}
          </Text>
        </Box>
      </Flex>
      <Box p="10px" pl="unset" mt="10px">
        <Text>{project.tagline}</Text>
      </Box>
      <Box mt="34px">
        <Text fontWeight={700} fontSize={"24px"}>
          The Details
        </Text>
        <Box p="10px" pl="unset" mt="10px">
          <Text whiteSpace={"pre-wrap"}>{project.description}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectInfoSection;
