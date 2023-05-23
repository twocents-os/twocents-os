import { Box, Flex, Text, Link, Spinner } from "@chakra-ui/react";
import React from "react";

const WaitForMinting = ({ ...props }) => {
  return (
    <Box {...props} mt="40px">
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text fontWeight={700} fontSize={"24px"} mt="34px">
          Minting ...
        </Text>
        <Text fontWeight={400} fontSize={"16px"} mt="34px">
          Please Wait - don&rsquo;t close this window
        </Text>
      </Flex>
    </Box>
  );
};
export default WaitForMinting;
