import ReactMarkdown from "react-markdown";
import { Box, Text, Flex, Link, Image } from "@chakra-ui/react";
import React from "react";

const ActivityPoapCard = ({ data, date, ...props }) => {
  return (
    <Box
      backgroundColor={"white"}
      borderRadius={"12px"}
      maxW="600px"
      mt="18px"
      pt="22px"
      pl="22px"
      pb="22px"
      pr="22px"
      display={"flex"}
      boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)"
      {...props}
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
      <Flex flexDirection={"column"} flexGrow={1}>
        <Link
          isExternal={true}
          target={"_blank"}
          href={`https://app.poap.xyz/token/${data.tokenId}`}
        >
          <Text fontWeight={600} fontSize={"16px"}>
            {data.event.name}
          </Text>
        </Link>
        <Flex>
          <Text fontFamily={"roboto"} fontWeight={600} color={"#EC6D68"}>
            {date.toLocaleDateString()}
          </Text>
          <Text
            backgroundColor={"#C3C0FC"}
            borderRadius={"5px"}
            p="3px"
            pl="6px"
            pr="6px"
            ml="10px"
            fontWeight={600}
          >
            POAP Claimed
          </Text>
        </Flex>
        <Text noOfLines={4} mt="24px" wordBreak={"break-all"}>
          <ReactMarkdown>{data.event.description}</ReactMarkdown>
        </Text>
      </Flex>
    </Box>
  );
};
export default ActivityPoapCard;
