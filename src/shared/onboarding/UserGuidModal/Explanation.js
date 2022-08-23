import { Flex, Text, Container, Center } from "@chakra-ui/react";
import UIButton from "@src/shared/ui-button";

const Explanation = ({ nextStepOption, backButtonHandler }) => {
  return (
    <Container>
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
        <Center>
          <Flex
            flexDirection={"column"}
            mt="36px"
            maxW={"400px"}
            p="16px"
            backgroundColor={"#FFFDED"}
            border="1px solid #DBDBDB"
            borderRadius={"8px"}
          >
            <Text fontSize={"18px"} fontWeight={600}>
              {nextStepOption.explanationTitle}
            </Text>
            <Text fontSize={"14.5px"} mt="8px">
              {nextStepOption.explanation}
            </Text>
            <UIButton
              type="secondary"
              fontSize={"18px"}
              mt="16px"
              as="a"
              href={nextStepOption.actionLink}
            >
              Let&apos;s Do It →{" "}
            </UIButton>
          </Flex>
        </Center>
        <Text
          color={"#1A2EF3"}
          cursor="pointer"
          fontWeight={600}
          mt="36px"
          onClick={backButtonHandler}
        >
          I want to do something else
        </Text>
      </Flex>
    </Container>
  );
};

export default Explanation;
