import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Container,
  Textarea,
} from "@chakra-ui/react";
import UIButton from "@src/shared/ui-button";
import { useState } from "react";
import frontUtils from "@src/shared/front-utils";

export const SpecialTalantStep = ({ onContinue, onboardingData }) => {
  const [specialTalant, setSpecialTalant] = useState(
    onboardingData?.specialTalant || ""
  );
  const [errorMessage, setErrorMessage] = useState();

  const handleSpecialTalantChange = (e) => {
    setSpecialTalant(e.target.value);
  };

  const isStepDataValid = () => {
    if (frontUtils.isEmptyString(specialTalant)) {
      setErrorMessage("Please tell as bit more about your talants");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleContinue = () => {
    if (!isStepDataValid()) {
      return;
    }
    onContinue({ specialTalant });
  };

  return (
    <Container>
      <Text
        fontWeight={700}
        fontSize={"48px"}
        color="#041439"
        textAlign={"center"}
      >
        Your Special Talents
      </Text>
      <Text color={"#656565"} mt="32px" textAlign={"center"}>
        If you have any special knowledge, skills or talents you would like
        people to know about you, feel free to write down any. You never know
        who might reach out for your help!
      </Text>
      <Box pl="40px" pr="40px">
        <Box mt="72px">
          <FormControl>
            <FormLabel
              htmlFor="email"
              fontWeight={600}
              fontSize={"16px"}
              mb="10px"
            >
              Your superpowers:
            </FormLabel>
            <Textarea
              placeholder="I can juggle with just one hand!"
              value={specialTalant}
              onChange={handleSpecialTalantChange}
            />
          </FormControl>
        </Box>
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
