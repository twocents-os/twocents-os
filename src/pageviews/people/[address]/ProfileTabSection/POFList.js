import { Box, Text, Divider } from "@chakra-ui/react";
import React from "react";
import POFCard from "@src/shared/pof/POFCard";

const POFList = ({ received, minted, ...props }) => {
  return (
    <Box {...props}>
      <Text fontWeight={700} mt="20px">
        POFs Received
      </Text>
      <Divider mt="20px" mb="20px" />
      {(!received || received.length === 0) && (
        <Box
          backgroundColor={"white"}
          p="10px"
          pt="20px"
          pb="20px"
          borderRadius={"12px"}
          border="1px solid black"
        >
          <Text fontWeight={700}>
            You don&apos;t have any POF received yet.
          </Text>
          <Text mt="20px">
            When you start collecting, they will show up here.
          </Text>
        </Box>
      )}
      {received?.map((pof) => (
        <POFCard key={`pof-card-${pof._id}`} pof={pof} mt={"10px"} />
      ))}
      <Text fontWeight={700} mt="20px">
        POFs Given
      </Text>
      <Divider mt="20px" mb="20px" />
      {(!minted || minted.length === 0) && (
        <Box
          backgroundColor={"white"}
          p="10px"
          pt="20px"
          pb="20px"
          borderRadius={"12px"}
          border="1px solid black"
        >
          <Text fontWeight={700}>You don&apos;t have any POFs given yet.</Text>
          <Text mt="20px">
            When you start minting &amp; sending, they will show up here.
          </Text>
        </Box>
      )}
      {minted?.map((pof) => (
        <POFCard key={`pof-card-${pof._id}`} pof={pof} mt={"10px"} />
      ))}
    </Box>
  );
};
export default POFList;
