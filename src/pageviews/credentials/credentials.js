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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import frontUtils from "@src/shared/front-utils";
import { useState, useEffect } from "react";

const CredentialsPageView = ({ users }) => {
  return (
    <Container
      maxW={"6xl"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      pb="140px"
      pt="40px"
    >
      {!users ||
        (users.length === 0 && (
          <Box>
            <Flex
              backgroundColor={"white"}
              borderRadius={"8px"}
              border="solid 2px black"
              mt="20px"
              p="20px"
              w="320px"
              h="120px"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text>No Data</Text>
            </Flex>
          </Box>
        ))}

      <Accordion w="100%">
        {users.map((item) => {
          const user = item.user[0];
          return (
            <AccordionItem key={item._id}>
              <AccordionButton>
                <Flex w="100%" alignItems={"center"}>
                  <Image
                    ml="20px"
                    src={`/profile-icons/image ${frontUtils.getIconIndexByAddress(
                      user.address
                    )}.png`}
                    backgroundColor={"black"}
                    height="24px"
                    width="24px"
                    alt="profile-picture"
                    border="dashed 1px white"
                    borderRadius="50%"
                    fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
                  />
                  <Text fontWeight={600} fontSize={"15px"} ml="10px">
                    {frontUtils.get6DigitOfAccount(user.address)} -{" "}
                    {user?.onboardingData?.init?.userName} {"  "}
                    {"["}
                    {item?.count || 0}
                    {"]"}
                  </Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {item.credentials.map((credential) => {
                  return (
                    <Box key={credential._id}>
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
                          as="a"
                          href={`/credentials/${credential._id}`}
                          target="_blank"
                          cursor={"pointer"}
                          w="100%"
                          display={"block"}
                        >
                          {credential.credentialSubject}
                        </Text>

                        <Flex
                          mt="24px"
                          justifyContent={"start"}
                          alignItems={"center"}
                          cursor={"pointer"}
                        >
                          <Text fontWeight={700} fontSize={"18px"}>
                            Owner:
                          </Text>
                          <Text
                            color={"black"}
                            mr="10px"
                            fontWeight={700}
                            ml="20px"
                          >
                            {credential.recipientAddress}
                          </Text>
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

                        <Text
                          fontWeight={700}
                          fontSize={"18px"}
                          mt={"20px"}
                          mb="10px"
                        >
                          Description
                        </Text>
                        <Text whiteSpace={"pre-wrap"}>
                          {credential.credentialDescription}
                        </Text>

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
                          <Text
                            fontWeight={700}
                            fontSize={"18px"}
                            mt={"20px"}
                            mb="10px"
                          >
                            Contributions:
                          </Text>
                          {credential.contributions.map(
                            (contribution, index) => {
                              return (
                                <Text
                                  key={`contrib-${index}`}
                                >{`✅ ${contribution.trim()}`}</Text>
                              );
                            }
                          )}
                        </Flex>
                      </Box>
                    </Box>
                  );
                })}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Container>
  );
};
export default CredentialsPageView;
