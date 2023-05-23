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

const OnChainCredentialPageView = ({ credentialId, credential }) => {
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
            {credential.name}
          </Text>
          <Center>
            <Image
              src={credential.imageUrl || "/iou/baloon.png"}
              objectFit={"contain"}
              mt="20px"
              h="215px"
              w="215px"
              alt="nft-image"
              boxShadow={
                "4px 4px 4px rgba(0, 0, 0, 0.25), -4px -4px 4px rgba(0, 0, 0, 0.25)"
              }
              backgroundColor="white"
              borderRadius="8px"
              fallbackSrc="https://via.placeholder.com/215x215/1a202c/FFFFFF?Text=WebsiteBuilders.com"
            />
          </Center>
          <Flex
            mt="24px"
            justifyContent={"start"}
            alignItems={"center"}
            onClick={() => handleAddressClick(credential.mintedBy)}
            cursor={"pointer"}
          >
            <Text fontWeight={700} fontSize={"18px"}>
              From:
            </Text>
            <Text color={"black"} mr="10px" fontWeight={700} ml="20px">
              {frontUtils.get6DigitOfAccount(credential.mintedBy)}
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
              href={`/people/${credential.mintedby}`}
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
            onClick={() => handleAddressClick(credential.receiverAddress)}
            cursor={"pointer"}
          >
            <Text fontWeight={700} fontSize={"18px"}>
              To:
            </Text>
            <Text color={"black"} mr="10px" fontWeight={700} ml="20px">
              {frontUtils.get6DigitOfAccount(credential.receiverAddress)}
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
              href={`/people/${credential.receiverAddress}`}
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
          <Text whiteSpace={"pre-wrap"}> {credential.description}</Text>
          <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
            Project
          </Text>

          <Text
            whiteSpace={"pre-wrap"}
            as="a"
            href={`/project/${credential.projectId}`}
            textDecor={"underline"}
            cursor={"pointer"}
            target="_blank"
          >
            {" "}
            {credential.project.label}
          </Text>
          <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
            Message From sender
          </Text>
          <Text whiteSpace={"pre-wrap"}> {credential.message}</Text>
        </Box>
      </Box>
    </Container>
  );
};
export default OnChainCredentialPageView;
