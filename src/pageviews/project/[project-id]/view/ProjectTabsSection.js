import { Box, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import UIButton from "@src/shared/ui-button";
import FeedbackCard from "@src/pageviews/project/[project-id]/view/FeedbackCard";
import { usePageState } from "@src/shared/state";

const ProjectTabsSection = ({ feedbacks, submitFeedback, ...props }) => {
  const [state, methods] = usePageState();
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handlePostFeedback = () => {
    if (!state.currentAddress) {
      methods.openConnectToWallet();
      return;
    }
    submitFeedback({ feedback });
  };
  return (
    <Box {...props}>
      {feedbacks && feedbacks.length > 0 && (
        <Text fontWeight={700} fontSize="24px">
          Feedbacks
        </Text>
      )}
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback._id} feedback={feedback} mt="20px" />
      ))}
    </Box>
  );
};

export default ProjectTabsSection;
