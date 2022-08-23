import ReactMarkdown from "react-markdown";
import { Box, Text, Flex, Link } from "@chakra-ui/react";
import React from "react";

const ActivitySnaptshotCard = ({ data, date, ...props }) => {
  return (
    <Box
      backgroundColor={"white"}
      borderRadius={"12px"}
      maxW="600px"
      mt="18px"
      pt="22px"
      pl="34px"
      pb="22px"
      pr="34px"
      boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)"
      {...props}
    >
      <Link isExternal={true} target={"_blank"} href={data.proposal.link}>
        <Text fontWeight={600} fontSize={"16px"}>
          {data.proposal.title}
        </Text>
      </Link>
      <Flex alignItems={"center"}>
        <Text fontFamily={"roboto"} fontWeight={600} color={"#EC6D68"}>
          {date.toLocaleString()}
        </Text>
        <Text
          backgroundColor={"#FACE8C"}
          borderRadius={"5px"}
          p="3px"
          pl="6px"
          pr="6px"
          ml="10px"
          fontWeight={600}
        >
          Snapshot Vote
        </Text>
      </Flex>
      <Text noOfLines={4} mt="24px" wordBreak={"break-all"}>
        <ReactMarkdown>{data.proposal.body}</ReactMarkdown>
      </Text>
    </Box>
  );
};
export default ActivitySnaptshotCard;
