import {
  Box,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  chakra,
  Input,
  Textarea,
} from "@chakra-ui/react";
import UIButton from "@src/shared/ui-button";
import React, { useState } from "react";
import frontUtils from "@src/shared/front-utils";

export const VerifiedCredentialModal = ({ onClose, isOpen, onSubmit }) => {
  const [skills, setSkills] = useState("");
  const [contributions, setContributions] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    if (
      frontUtils.isEmptyString(skills) ||
      frontUtils.isEmptyString(contributions) ||
      frontUtils.isEmptyString(subject) ||
      frontUtils.isEmptyString(description)
    ) {
      toast({ title: "Please fill out all fields of form", status: "error" });
      return;
    }
    onSubmit({
      subject,
      description,
      contributions,
      skills,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Verified Credentials</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Box mt={"20px"}>
              <Text fontSize={"16px"} fontWeight={700}>
                Subject <chakra.span color={"red"}> *</chakra.span>
              </Text>

              <Input
                mt={"20px"}
                backgroundColor="white"
                color="black"
                placeholder="Skills separated with comma"
                type="text"
                value={subject || ""}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Box>
            <Box mt={"20px"}>
              <Text fontSize={"16px"} fontWeight={700}>
                Description <chakra.span color={"red"}> *</chakra.span>
              </Text>

              <Input
                mt={"20px"}
                backgroundColor="white"
                color="black"
                placeholder="Skills separated with comma"
                type="text"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box mt={"20px"}>
              <Text fontSize={"16px"} fontWeight={700}>
                Contributions <chakra.span color={"red"}> *</chakra.span>
              </Text>

              <Textarea
                mt={"20px"}
                backgroundColor="white"
                color="black"
                placeholder="Skills separated with comma"
                type="text"
                value={contributions || ""}
                onChange={(e) => setContributions(e.target.value)}
              />
            </Box>
            <Box mt={"20px"}>
              <Text fontSize={"16px"} fontWeight={700}>
                Skills <chakra.span color={"red"}> *</chakra.span>
              </Text>

              <Input
                mt={"20px"}
                backgroundColor="white"
                color="black"
                placeholder="Skills separated with comma"
                type="text"
                value={skills || ""}
                onChange={(e) => setSkills(e.target.value)}
              />
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button type="secondary" mr={"10px"} onClick={onClose}>
            Close
          </Button>
          <UIButton onClick={handleSubmit}>Submit</UIButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
