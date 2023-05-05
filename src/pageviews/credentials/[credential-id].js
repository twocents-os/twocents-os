import {
  Box,
  Link,
  Container,
  Text,
  Flex,
  Image,
  useToast,
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import frontUtils from "@src/shared/front-utils";
import { useState, useEffect } from "react";

const CredentialPageView = ({ credentialId, credential }) => {
  const toast = useToast();
  const handleAddressClick = (address) => {
    frontUtils.CopyMe(address);
    toast({
      title: "Address copied in clipboard",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <Container
      maxW={"6xl"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box
        maxW={"600px"}
        minW={["320px", "320px", "600px"]}
        mt="40px"
        mb="120px"
      >
        <Text
          fontWeight={700}
          fontFamily={"Pacifico"}
          fontSize={"24px"}
          fontStyle={"italic"}
        >
          Credential
        </Text>
        <Box
          backgroundColor={"white"}
          borderRadius={"8px"}
          border="solid 2px black"
          mt="20px"
          p="20px"
          pb="60px"
        >
          <Text
            fontWeight={700}
            fontSize={"24px"}
            mt={"20px"}
            mb="10px"
            textAlign={"center"}
          >
            {credential.credentialSubject}
          </Text>
          <Flex
            mt="24px"
            justifyContent={"start"}
            alignItems={"center"}
            onClick={() => handleAddressClick(credential.issuerAddress)}
            cursor={"pointer"}
          >
            <Text fontWeight={700} fontSize={"18px"}>
              From:
            </Text>
            <Text color={"black"} mr="10px" fontWeight={700} ml="20px">
              {frontUtils.get6DigitOfAccount(credential.issuerAddress)}
            </Text>
            <Box>
              <FontAwesomeIcon
                icon={faCopy}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
            <Box
              ml="20px"
              as={"a"}
              href={`/people/${credential.issuerAddress}`}
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
          </Flex>

          <Flex
            mt="24px"
            justifyContent={"start"}
            alignItems={"center"}
            onClick={() => handleAddressClick(credential.recipientAddress)}
            cursor={"pointer"}
          >
            <Text fontWeight={700} fontSize={"18px"}>
              To:
            </Text>
            <Text color={"black"} mr="10px" fontWeight={700} ml="20px">
              {frontUtils.get6DigitOfAccount(credential.recipientAddress)}
            </Text>
            <Box>
              <FontAwesomeIcon
                icon={faCopy}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
            <Box
              ml="20px"
              as={"a"}
              href={`/people/${credential.recipientAddress}`}
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
          </Flex>

          <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
            Description
          </Text>
          <Text> {credential.credentialDescription}</Text>

          <Wrap mt="20px">
            {credential.skills
              .map((skill, index) => {
                const bgColors = [
                  "#feecb0",
                  "#b8fec7",
                  "#ffc49d",
                  "#d0b8fd",
                  "#c6fac5",
                  "#ffdfa8",
                  "#c0c4ff",
                ];
                return {
                  title: skill,
                  bgColor: bgColors[index % bgColors.length],
                };
              })
              .map((skill, index) => (
                <WrapItem key={`skill-${index}`}>
                  <Box
                    borderRadius="32px"
                    backgroundColor={skill.bgColor}
                    pl="12px"
                    pr="12px"
                    pt="6px"
                    pb="6px"
                    fontSize={"14.4px"}
                  >
                    {skill.title}
                  </Box>
                </WrapItem>
              ))}
          </Wrap>
          <Flex flexDir={"column"}>
            <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
              Contributions:
            </Text>
            {credential.contributions.map((contribution, index) => {
              return (
                <Text
                  key={`contrib-${index}`}
                >{`✅ ${contribution.trim()}`}</Text>
              );
            })}
          </Flex>
        </Box>
      </Box>
    </Container>
  );
};
export default CredentialPageView;
