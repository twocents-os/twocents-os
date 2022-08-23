import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Textarea,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UIButton from "@src/shared/ui-button";

const InterestedInProjectModal = ({ onClose, isOpen, onSubmit }) => {
  const [feedback, setFeedback] = useState();
  const [options, setOptions] = useState([
    {
      id: 1,
      title: "I'd like to join the team",
      value: "WANTS_JOIN_TEAM",
      selected: false,
    },
    {
      id: 2,
      title: "I'd like to invest",
      value: "WANTS_INVEST",
      selected: false,
    },
    {
      id: 3,
      title: "I'd like to partner up",
      value: "WANTS_PARTNERSHIP",
      selected: false,
    },
    {
      id: 4,
      title: "I'd like to try it out",
      value: "WANTS_TRY",
      selected: false,
    },
  ]);
  const handleOptionToggle = (option) => {
    const newArray = [...options];
    const index = newArray.findIndex((opt) => opt.id === option.id);
    newArray[index] = { ...option, selected: !option.selected };
    setOptions(newArray);
  };

  const handleFeedbackCahnge = (e) => {
    setFeedback(e.target.value);
  };
  const handleSubmit = () => {
    onSubmit({ options, feedback });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Support This Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Let the project team know how you would like to help or get
            involved.
          </Text>
          <Stack mt="20px">
            {options.map((option) => (
              <Button
                key={option.id}
                onClick={() => handleOptionToggle(option)}
                colorScheme={option.selected ? "green" : null}
              >
                {option.title}
              </Button>
            ))}
          </Stack>
          <Text fontWeight={700} mt="34px">
            Leave some feedback
          </Text>
          <Textarea
            mt="10px"
            onChange={handleFeedbackCahnge}
            value={feedback}
          />
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <UIButton onClick={handleSubmit}>Submit</UIButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InterestedInProjectModal;
