import ReactMarkdown from "react-markdown";
import { Box, Image, Text, Link } from "@chakra-ui/react";
import React from "react";

const CommunityCard = ({ community, ...props }) => {
  return (
    <Box
      backgroundColor={"white"}
      borderRadius={"12px"}
      mt="18px"
      pt="22px"
      pl="34px"
      pb="22px"
      pr="34px"
      {...props}
      display={"flex"}
      flexDirection={["column", "column", "column", "row"]}
      alignItems={"center"}
      border={"solid 2px black"}
    >
      <Image
        src={community.logoImageUrl}
        height="118px"
        width="118px"
        alt="poap-picture"
        border="dashed 1px white"
        borderRadius="50%"
        fallbackSrc="https://via.placeholder.com/118/1a202c/FFFFFF?Text=WebsiteBuilders.com"
      />
      <Box ml="20px">
        <Link isExternal={false} target={"_blank"} href={`/${community._id}`}>
          <Text fontSize={"24px"} fontWeight={600}>
            {community.communityName}
          </Text>
        </Link>
        <Text noOfLines={4} mt="24px">
          <ReactMarkdown>{community.description}</ReactMarkdown>
        </Text>
      </Box>
    </Box>
  );
};
export default CommunityCard;
