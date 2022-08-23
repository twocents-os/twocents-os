import { Box, Text, Button, Flex, Container } from "@chakra-ui/react";
import UIButton from "@src/shared/ui-button";
import { useState, useEffect } from "react";
import { useApi } from "../api";
import useErrorHandler from "@src/shared/error/useErrorHandler";

export const CategoryStep = ({ onContinue, onboardingData }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "onboarding-CategoryStep";
  const api = useApi();
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.call("get", `/api/fetch-categories`);
        if (!onboardingData?.selectedCategories) {
          setCategories(response.categories);
          return;
        }
        const mergedCategories = response.categories.map((c) => {
          const matchedElement = onboardingData.selectedCategories.find(
            (s) => s._id === c._id
          );
          if (matchedElement) {
            return { ...c, selected: true };
          }
          return { ...c, selected: false };
        });
        setCategories(mergedCategories);
      } catch (error) {
        errorHandler(error, [placeTag]);
      }
    };
    fetchCategories();
  }, []);

  const toggleCateogry = (category) => {
    const categoryIndex = categories.findIndex((c) => c._id === category._id);
    const newArray = [...categories];
    newArray[categoryIndex] = { ...category, selected: !category.selected };
    setCategories(newArray);
  };

  const handleContinue = () => {
    if (!isStepDataValid()) {
      return;
    }
    const selectedCategories = categories.filter((c) => c.selected);
    onContinue({ selectedCategories });
  };

  const isStepDataValid = () => {
    if (categories.filter((c) => c.selected).length === 0) {
      setErrorMessage("Please select at least one category");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  return (
    <Container>
      <Text
        fontWeight={700}
        textAlign={"center"}
        fontSize={"48px"}
        color="#041439"
      >
        What kind of projects excite you?
      </Text>
      <Text color={"#656565"} mt="32px" textAlign={"center"}>
        Select some topics, to discover Web3 Community Projects that may
        interest you. You can always edit these later.
      </Text>
      <Box mt="72px">
        <Flex justifyContent={"center"} alignItems={"center"} flexWrap={"wrap"}>
          {categories.map((category) => {
            return (
              <Button
                key={category._id}
                onClick={() => toggleCateogry(category)}
                color="black"
                backgroundColor={"white"}
                border={
                  category.selected ? "solid 3px #2DEC90" : "solid 1px #B1B1B1"
                }
                borderRadius={"4px"}
                _focus={{ outline: "unset" }}
                mt="20px"
                mr="20px"
              >
                {category.label}
              </Button>
            );
          })}
        </Flex>
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
