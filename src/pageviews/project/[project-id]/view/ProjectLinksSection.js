import { Box, Text, Link } from "@chakra-ui/react";
import React from "react";

const ProjectLinksSection = ({ project, ...props }) => {
  return (
    <>
      {project?.links && project.links.length > 0 && (
        <Box {...props}>
          <Text fontWeight={700} fontSize={"16px"} mb="10px">
            Links You Need To Know About
          </Text>
          {project?.links?.map((link, index) => {
            return (
              <Box
                key={`other-link-${index}`}
                display={"flex"}
                alignItems={"flex-start"}
                flexDir={link.isEditing ? "column" : "row"}
                mt="20px"
              >
                <Link
                  href={link.url}
                  isExternal={true}
                  target={"_blank"}
                  p="10px"
                  backgroundColor="#FFE1B5"
                  borderRadius={"12px"}
                  border="2px black solid "
                  fontWeight={700}
                  textAlign={"center"}
                  _hover={{ textDecoration: "unset" }}
                  flexGrow={1}
                >
                  {link.title}
                </Link>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default ProjectLinksSection;
