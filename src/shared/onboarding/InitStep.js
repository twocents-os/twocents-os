import {
  Box,
  Text,
  Input,
  InputLeftAddon,
  InputGroup,
  Textarea,
  Flex,
  Container,
} from "@chakra-ui/react";
import UIButton from "@src/shared/ui-button";
import { usePageState } from "@src/shared/state";
import { useState } from "react";
import frontUtils from "@src/shared/front-utils";
import { useApi } from "../api";
import useErrorHandler from "@src/shared/error/useErrorHandler";

export const InitStep = ({ onContinue, onboardingData }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "onboarding-InitStep";
  const api = useApi();
  const [state, methods] = usePageState();
  const [userName, setUserName] = useState(onboardingData?.userName);
  const [bio, setBio] = useState(onboardingData?.bio || "");
  const [errorMessage, setErrorMessage] = useState();
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleBioChange = (e) => {
    if (bio.length + 1 > 380) return;
    setBio(e.target.value);
  };
  const handleContinue = async () => {
    if (!(await isStepDataValid())) {
      return;
    }
    onContinue({ bio, userName });
  };
  const isUserNameUnique = async () => {
    try {
      const response = await api.call(
        "get",
        `/api/users/is-username-unique?username=${userName}&address=${state.currentAddress}`
      );
      return response.isUserNameUnique;
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };
  const isStepDataValid = async () => {
    if (frontUtils.isEmptyString(userName) || userName.length < 4) {
      setErrorMessage(
        "Please set valid user name. It should be more than 4 character"
      );
      return false;
    }
    if (!(await isUserNameUnique())) {
      setErrorMessage(
        `User name ${userName} is already taken please choose different one`
      );
      return false;
    }

    if (frontUtils.isEmptyString(bio)) {
      setErrorMessage("Please set your bio");
      return false;
    }
    setErrorMessage(null);
    return true;
  };
  return (
    <Container>
      <Text
        fontWeight={700}
        fontSize={"48px"}
        textAlign={"center"}
        color={"#041439"}
      >
        Hello World
      </Text>
      <Text mt="32px" color="#656565">
        This is a short and optional way to tell the world more about yourself.
        Create a profile to get notified of Web3 projects opportunities and help
        Web3 communities reach out to you.
      </Text>
      <Box mt="72px">
        <Text color={"black"} fontWeight={700}>
          Pick a user name
        </Text>
        <Input
          mt="10px"
          type="text"
          placeholder={state.currentAddress}
          value={userName || ""}
          onChange={handleUserNameChange}
        />
      </Box>
      <Box mt="64px">
        <Flex justifyContent={"space-between"}>
          <Text fontWeight={700}>Bio</Text>
          <Text
            textAlign={"right"}
            fontFamily={"roboto"}
            color="#6C727F"
            fontSize={"16px"}
          >
            {bio.length}/380
          </Text>
        </Flex>
        <Textarea
          mt="10px"
          placeholder="Tell/ the world a little about yourself!"
          value={bio}
          onChange={handleBioChange}
        />
      </Box>
      {errorMessage && (
        <Text color={"red"} textAlign={"center"} mt="40px">
          {errorMessage}
        </Text>
      )}
      <Flex justifyContent={"center"}>
        <UIButton onClick={handleContinue} type="secondary" mt="72px" mb="30px">
          Continue
        </UIButton>
      </Flex>
    </Container>
  );
};
