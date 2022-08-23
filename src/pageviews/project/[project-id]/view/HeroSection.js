import { Flex, Image } from "@chakra-ui/react";
import React from "react";

const HeroSection = ({ project, ...props }) => {
  return (
    <Flex
      mt={"10px"}
      flexDirection={"column"}
      alignItems={"center"}
      position={"relative"}
      {...props}
    >
      <Image
        src={project.coverImageUrl}
        minH={["200px", "200px", "400px", "600px"]}
        minW={["300px", "300px", "600px", "900px"]}
        w="auto"
        h="auto"
        objectFit={"cover"}
        alt="community-image"
        border="dashed 1px white"
        borderRadius="13px"
        fallbackSrc="/project/default-cover.png"
      />
    </Flex>
  );
};

export default HeroSection;
