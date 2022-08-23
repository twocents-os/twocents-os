import {
  Box,
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import React from "react";

const VerifiedTick = ({ ...props }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box
          borderRadius={"50%"}
          backgroundColor={"#0095ff"}
          color="white"
          w="24px"
          h="24px"
          textAlign={"center"}
          lineHeight="24px"
          cursor={"pointer"}
          {...props}
        >
          ✔
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody textAlign={"center"} mb="12px">
          <Flex
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Box
              mt="10px"
              borderRadius={"50%"}
              backgroundColor={"#0095ff"}
              color="white"
              w="24px"
              h="24px"
              textAlign={"center"}
              lineHeight="24px"
            >
              ✔
            </Box>
            <Text
              textAlign={"center"}
              fontWeight={700}
              fontSize="18px"
              mt="12px"
            >
              Account information
            </Text>
            <Text textAlign={"center"} mt="12px">
              This account is verified by wallet owner
            </Text>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default VerifiedTick;
