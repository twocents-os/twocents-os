import { Box, Text, Flex, Image, useToast, Link } from "@chakra-ui/react";
import React from "react";
import frontUtils from "@src/shared/front-utils";

const ProjectCreators = ({ creators }) => {
  return (
    <Box>
      {creators.map((creator, index) => (
        <Box key={`creator-${index}`} mt="12px">
          <Flex alignItems={"center"}>
            <Image
              src={creator.avatarImageUrl}
              backgroundColor={"black"}
              height="48px"
              width="48px"
              mr="20px"
              alt="profile-picture"
              borderRadius="50%"
              fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
            />
            <Flex flexDirection={"column"}>
              <Link href={`/people/${creator.address}`}>
                <Text fontSize={"18px"} fontWeight={700}>
                  {creator.name}
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};
const ProjectOwnerSection = ({ profile, project, ...props }) => {
  return (
    <Box mb="40px" {...props}>
      <Text fontWeight={700} fontSize={"24px"} mb="10px">
        Project Creator
      </Text>
      {project?.creators && <ProjectCreators creators={project.creators} />}
      {!project?.creators && (
        <Flex alignItems={"center"}>
          <Image
            src={
              profile?.userData?.avatarImageUrl ||
              `/profile-icons/image ${frontUtils.getIconIndexByAddress(
                profile?.address
              )}.png`
            }
            backgroundColor={"black"}
            height="48px"
            width="48px"
            mr="20px"
            alt="profile-picture"
            borderRadius="50%"
            fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
          />
          <Flex flexDirection={"column"}>
            <Link href={`/people/${profile.address}`}>
              <Text fontSize={"18px"} fontWeight={700}>
                {profile?.userData?.userName || "Unknown"}
              </Text>
            </Link>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default ProjectOwnerSection;
