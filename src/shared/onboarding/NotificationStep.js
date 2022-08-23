import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Container,
} from "@chakra-ui/react";
import UIButton from "@src/shared/ui-button";
import { useState } from "react";
import frontUtils from "@src/shared/front-utils";

export const NotificationStep = ({ onContinue, onboardingData }) => {
  const [email, setEmail] = useState(onboardingData?.email || "");
  const [errorMessage, setErrorMessage] = useState();
  // const [preferences, setPreferences] = useState(
  //   onboardingData?.preferences || [
  //     {
  //       _id: "11",
  //       title: "When new bounties are available that I may be interested in",
  //       value: "INTERESTING_BOUNTIES",
  //       checked: false,
  //     },
  //     {
  //       _id: "12",
  //       title: "When a project I follow has a news",
  //       value: "PROJECT_NEWS",
  //       checked: false,
  //     },
  //     {
  //       _id: "14",
  //       title:
  //         "When a project I may be interested in, is looking for contributors",
  //       value: "LOOKING_FOR_CONTRIBUTORS",
  //       checked: false,
  //     },
  //   ]
  // );

  // const toggleBooleanInState = (currentObject, searchArray, setArray) => {
  //   const currentObjectIndex = searchArray.findIndex(
  //     (c) => c._id === currentObject._id
  //   );
  //   const newArray = [...searchArray];
  //   newArray[currentObjectIndex] = {
  //     ...currentObject,
  //     checked: !currentObject.checked,
  //   };
  //   setArray(newArray);
  // };

  // const togglePreference = (preference) => {
  //   toggleBooleanInState(preference, preferences, setPreferences);
  // };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isStepDataValid = () => {
    if (frontUtils.isEmptyString(email) || !frontUtils.isValidateEmail(email)) {
      setErrorMessage("Please type valid email");
      return false;
    }
    // if (preferences.filter((c) => c.checked).length === 0) {
    //   setErrorMessage("Please select at least one notification preference");
    //   return false;
    // }
    setErrorMessage(null);
    return true;
  };

  const handleContinue = () => {
    if (!isStepDataValid()) {
      return;
    }
    onContinue({ email });
  };

  return (
    <Container>
      <Text
        fontWeight={700}
        fontSize={"48px"}
        color="#041439"
        textAlign={"center"}
      >
        Stay Informed
      </Text>
      <Text color={"#656565"} mt="32px" textAlign={"center"}>
        Let us know your email to send you only important notifications.
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
              Email address
            </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="punk7804@cryptopunks.com"
              value={email}
              onChange={handleEmailChange}
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
