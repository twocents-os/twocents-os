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
  Center,
} from "@chakra-ui/react";
import UIButton from "@src/shared/ui-button";
import React, { useState } from "react";
import frontUtils from "@src/shared/front-utils";

export const CeramicProfileModal = ({ onClose, isOpen, onSubmit }) => {
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async () => {
    if (frontUtils.isEmptyString(userName) || frontUtils.isEmptyString(bio)) {
      toast({ title: "Please fill out all fields of form", status: "error" });
      return;
    }
    onSubmit({
      userName,
      bio,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Ceramic Identity Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Text textAlign={"center"} fontWeight={700}>
              Before issue verified credentials you have to create Ceramic
              profile
            </Text>
          </Center>
          <Box mt="20px">
            <Box mt={"20px"}>
              <Text fontSize={"16px"} fontWeight={700}>
                User Name <chakra.span color={"red"}> *</chakra.span>
              </Text>

              <Input
                mt={"20px"}
                backgroundColor="white"
                color="black"
                placeholder="User Name"
                type="text"
                value={userName || ""}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Box>
            <Box mt={"20px"}>
              <Text fontSize={"16px"} fontWeight={700}>
                Bio <chakra.span color={"red"}> *</chakra.span>
              </Text>

              <Textarea
                mt={"20px"}
                backgroundColor="white"
                color="black"
                placeholder="Bio"
                type="text"
                value={bio || ""}
                onChange={(e) => setBio(e.target.value)}
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
