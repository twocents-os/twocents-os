import { Flex, Button, Text } from "@chakra-ui/react";

const NextSteps = ({ onContinue, options, setNextStepOption, onClose }) => {
  const handleOptionClick = (option) => {
    setNextStepOption(option);
    onContinue();
  };
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection="column"
    >
      <Text
        fontSize={"48px"}
        fontWeight={700}
        maxW="400px"
        textAlign={"center"}
      >
        What are you looking to do?
      </Text>
      <Text fontSize={"14.5px"} mt="24px" maxW="400px" textAlign={"center"}>
        Set up your public profile page, create your first project, give a
        &apos;Proof of Friendship&apos; to pals and collaborators, or take a
        look at other Two Cents features.
      </Text>
      <Flex flexDirection={"column"} mt="36px">
        <Button
          w="320px"
          mt="12px"
          backgroundColor={"#FFFDED"}
          onClick={onClose}
        >
          Continue what I was about to do
        </Button>
        {options.map((option) => (
          <Button
            key={`guid-option-${option.id}`}
            w="320px"
            mt="12px"
            backgroundColor={"#FFFDED"}
            onClick={() => handleOptionClick(option)}
          >
            {option.title}
          </Button>
        ))}
      </Flex>
      <Text
        as="a"
        href="/dashboard"
        color={"#1A2EF3"}
        fontWeight={600}
        mt="36px"
      >
        Take me to my Two Cents dashboard
      </Text>
    </Flex>
  );
};
export default NextSteps;
