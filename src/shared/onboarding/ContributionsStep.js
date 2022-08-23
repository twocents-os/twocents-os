import {
  Box,
  Text,
  Flex,
  Image,
  IconButton,
  Checkbox,
  Button,
  Container,
} from "@chakra-ui/react";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UIButton from "@src/shared/ui-button";
import { useState } from "react";

export const ContributionsStep = ({ onContinue, onboardingData }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [skills, setSkills] = useState(
    onboardingData?.skills || [
      {
        _id: "11",
        title: "💻 Software Development",
        value: "SOFTWARE_DEVELOPMENT",
        checked: false,
      },
      {
        _id: "19",
        title: "🐝 Community Building",
        value: "COMMUNITY_MANAGEMENT",
        checked: false,
      },
      {
        _id: "13",
        title: "🖌 Creative and Designer",
        value: "CREATIVE_DESIGNER",
        checked: false,
      },
      {
        _id: "14",
        title: "🖼 Content Creator",
        value: "CONTENT_CREATOR",
        checked: false,
      },
      {
        _id: "15",
        title: "👔 Business Development",
        value: "BUSINESS_DEV",
        checked: false,
      },
      {
        _id: "16",
        title: "💼 R&D: Research",
        value: "RESEARCH",
        checked: false,
      },
      {
        _id: "17",
        title: "📣 Marketing",
        value: "MARKETING",
        checked: false,
      },
    ]
  );

  const toggleBooleanInState = (currentObject, searchArray, setArray) => {
    const currentObjectIndex = searchArray.findIndex(
      (c) => c._id === currentObject._id
    );
    const newArray = [...searchArray];
    newArray[currentObjectIndex] = {
      ...currentObject,
      checked: !currentObject.checked,
    };
    setArray(newArray);
  };

  const toggleSkills = (skill) => {
    toggleBooleanInState(skill, skills, setSkills);
  };

  const isStepDataValid = () => {
    if (skills.filter((s) => s.checked).length === 0) {
      setErrorMessage('Please select at least one "Skill"');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleContinue = () => {
    if (!isStepDataValid()) {
      return;
    }
    onContinue({ skills });
  };

  return (
    <Container>
      <Text
        fontWeight={700}
        textAlign={"center"}
        fontSize={"48px"}
        color="#041439"
      >
        Signal your skills for Web3 opportunities
      </Text>
      <Text color={"#656565"} mt="32px" textAlign={"left"}>
        Highlight your interests, skills and allow others to reach out to you
        for contributing towards Web3 projects and bounty opportunities.
      </Text>
      <Box overflow={"hidden"}>
        <Box mt="72px">
          <Text fontWeight={600} fontSize={"16px"} mb="10px">
            Select all the skills you could help out with:
          </Text>
          {skills.map((skill) => {
            return (
              <Box key={skill._id}>
                <Button
                  maxW={"100%"}
                  w="100%"
                  mt="20px"
                  height={"56px"}
                  key={skill.id}
                  onClick={() => toggleSkills(skill)}
                  backgroundColor={!skill.checked && "#FFFDED"}
                  colorScheme={skill.checked ? "green" : null}
                >
                  {skill.title}
                </Button>
              </Box>
            );
          })}
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
