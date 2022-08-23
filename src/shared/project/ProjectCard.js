import { Box, Text, Image, Flex, Link } from "@chakra-ui/react";
import React from "react";

const ProjectCard = ({ project, ...props }) => {
  return (
    <Link
      isExternal={false}
      target={"_blank"}
      href={`/project/${project._id}`}
      _hover={{ textDecoration: "unset" }}
    >
      <Flex
        backgroundColor={"white"}
        boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)"
        p="10px"
        borderRadius={"6px"}
        h="156px"
        {...props}
      >
        <Image
          src={project.coverImageUrl}
          backgroundColor={"gray.300"}
          objectFit={"cover"}
          height="118px"
          width="86px"
          alt="profile-picture"
          fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
          borderRadius={"12px"}
          alignSelf="center"
        />
        <Box ml="10px" w="100%" mt={"10px"}>
          <Flex
            justifyContent={"start"}
            alignItems={"center"}
            w="100%"
            flexWrap={"wrap"}
          >
            <Text fontWeight={700} fontSize="16px">
              {project.name}
            </Text>
            <Text fontWeight={700} ml="10px">
              {project.tag}
            </Text>
          </Flex>
          <Text noOfLines={3} mt="6px">
            {project.description}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default ProjectCard;
