import { Box, Text, Divider } from "@chakra-ui/react";
import React from "react";
import IOUCard from "@src/shared/iou/IOUCard";

const IOUList = ({ received, minted, ...props }) => {
  return (
    <Box {...props}>
      <Text fontWeight={700} mt="20px">
        IOUs Received
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
            You don&apos;t have any IOU received yet.
          </Text>
          <Text mt="20px">
            When you start collecting, they will show up here.
          </Text>
        </Box>
      )}
      {received?.map((iou) => (
        <IOUCard key={`iou-card-${iou._id}`} iou={iou} mt={"10px"} />
      ))}
      <Text fontWeight={700} mt="20px">
        IOUs Given
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
          <Text fontWeight={700}>You don&apos;t have any IOU given yet.</Text>
          <Text mt="20px">
            When you start minting &amp; sending, they will show up here.
          </Text>
        </Box>
      )}
      {minted?.map((iou) => (
        <IOUCard key={`iou-card-${iou._id}`} iou={iou} mt={"10px"} />
      ))}
    </Box>
  );
};
export default IOUList;
