import { Box, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { usePageState } from "@src/shared/state";
import UIButton from "@src/shared/ui-button";
import InterestedInProjectModal from "@src/pageviews/project/[project-id]/view/InterestedInProjectModal";

const InterestedInProjectSection = ({ submitFeedback, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, methods] = usePageState();

  const handleInterestedClick = () => {
    if (!state.currentAddress) {
      methods.openConnectToWallet();
      return;
    }
    onOpen();
  };
  return (
    <Box
      {...props}
      mt="34px"
      backgroundColor={"#EBF0FF"}
      borderRadius={"8px"}
      border="1px solid #BFCCDA"
      p="10px"
    >
      <Text fontWeight={700} fontSize={"24px"}>
        Support This Project
      </Text>
      <Text mt="10px">
        Are you interested in getting involved or helping this project in
        someway?
        <br />
        Register your interest below.
      </Text>
      <UIButton mt="20px" onClick={handleInterestedClick}>
        👋️ I&apos;m Interested
      </UIButton>
      <InterestedInProjectModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={submitFeedback}
      />
    </Box>
  );
};

export default InterestedInProjectSection;
