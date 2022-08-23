import { Box, Text } from "@chakra-ui/react";
import React from "react";
import POFListMini from "@src/pageviews/project/[project-id]/view/POFListMini";

const POFListSection = ({ pofList, ...props }) => {
  if (!pofList || pofList.length === 0) return null;
  return (
    <Box {...props}>
      <Text fontWeight={700} fontSize={"24px"}>
        Project Friends
      </Text>
      <POFListMini pofList={pofList} mt="24px" />
    </Box>
  );
};

export default POFListSection;
