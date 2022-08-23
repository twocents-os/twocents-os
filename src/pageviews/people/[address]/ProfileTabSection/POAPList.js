import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PoapCard from "@src/pageviews/people/[address]/POAPCard";

const POAPList = ({ poaps, ...props }) => {
  return (
    <Box {...props}>
      {(!poaps || poaps.length === 0) && (
        <Box
          backgroundColor={"white"}
          p="10px"
          pt="20px"
          pb="20px"
          borderRadius={"12px"}
          border="1px solid black"
        >
          <Text fontWeight={700}>You don&apos;t have any POAP yet.</Text>
          <Text mt="20px">
            When you start collecting, they will show up here.
          </Text>
        </Box>
      )}
      {poaps.map((poap) => (
        <PoapCard key={poap.id} data={poap.data} date={poap.date} />
      ))}
    </Box>
  );
};
export default POAPList;
