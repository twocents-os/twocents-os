import ReactMarkdown from "react-markdown";
import { Box, Image, Text, Link } from "@chakra-ui/react";
import React from "react";

const PoapCard = ({ data, date, ...props }) => {
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
      boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)"
    >
      <Link
        isExternal={true}
        target={"_blank"}
        href={`https://app.poap.xyz/token/${data.tokenId}`}
        height="118px"
        width="118px"
        mr="20px"
      >
        <Image
          src={data.event.image_url}
          height="118px"
          minH="118px"
          width="118px"
          minW="118px"
          alt="poap-picture"
          border="dashed 1px white"
          borderRadius="50%"
          fallbackSrc="https://via.placeholder.com/118/1a202c/FFFFFF?Text=WebsiteBuilders.com"
        />
      </Link>
      <Box ml="20px">
        <Link
          isExternal={true}
          target={"_blank"}
          href={`https://app.poap.xyz/token/${data.tokenId}`}
        >
          <Text fontSize={"24px"} fontWeight={600}>
            {data.event.name}
          </Text>
        </Link>
        <Text
          fontFamily={"roboto"}
          fontSize={"14px"}
          fontWeight={600}
          color={"#EC6D68"}
        >
          {date.toLocaleDateString()}
        </Text>
        <Text noOfLines={4} mt="24px" wordBreak={"break-all"}>
          <ReactMarkdown>{data.event.description}</ReactMarkdown>
        </Text>
      </Box>
    </Box>
  );
};

export default PoapCard;
