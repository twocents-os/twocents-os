import { Box, useToast, Text, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import { usePageState } from "@src/shared/state";
import frontUtils from "@src/shared/front-utils";

const OnChainCredentialsCard = ({ credential, ...props }) => {
  return (
    <Box
      {...props}
      backgroundColor={"white"}
      boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)"
      borderRadius={"8px"}
      pb={"20px"}
      pt={"20px"}
      pl={["5px", "5px", "20px"]}
      pr="5px"
    >
      <Flex flexDirection={"row"} alignItems={["center", "center", "center"]}>
        <Flex flexDirection={"column"}>
          <Link
            href={`/on-chain-credentials/${credential._id}`}
            target={"_blank"}
            mt={["20px", "20px", "unset"]}
          >
            <Image
              src={credential.imageUrl}
              backgroundColor={"#FFEBCD"}
              boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)"
              height="160px"
              minH="160px"
              width="160px"
              minW="160px"
              p="10px"
              objectFit={"contain"}
              alt="pof-picture"
              borderRadius="20px"
              fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
            />
          </Link>
          <Flex justifyContent={"center"} mt="10px">
            <Text fontWeight={700} fontSize={"12"} textAlign="center">
              Minted
            </Text>
          </Flex>
        </Flex>
        <Flex
          ml="10px"
          alignSelf={"start"}
          flexDirection="column"
          height={"178px"}
        >
          <Box flexGrow={1}>
            <Flex alignItems={"center"}>
              <Text fontSize={"14.5px"} fontWeight={700}>
                {credential.name}
              </Text>
            </Flex>
            <Flex mt="8px">
              <Link
                href={`/people/${credential?.receiverAddress}`}
                target={"_blank"}
                display={"flex"}
                alignItems="center"
              >
                <Text fontWeight={600} fontSize={"12px"}>
                  {frontUtils.get6DigitOfAccount(credential?.receiverAddress)}
                </Text>
                <Image
                  ml="20px"
                  src={`/profile-icons/image ${frontUtils.getIconIndexByAddress(
                    credential?.receiverAddress
                  )}.png`}
                  backgroundColor={"black"}
                  height="24px"
                  width="24px"
                  alt="profile-picture"
                  border="dashed 1px white"
                  borderRadius="50%"
                  fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
                />
              </Link>
            </Flex>
            <Text>Contract: {credential.contractAddress}</Text>
            {credential.contractType === "ERC20" && (
              <Text>Amount: ${credential.amount}</Text>
            )}
            <Flex alignItems={"center"} mt="12px">
              <Text fontSize={"13px"} noOfLines={4}>
                {credential.description}
              </Text>
            </Flex>
          </Box>
          <Link
            fontSize={"14.5px"}
            fontWeight={700}
            href={`/on-chain-credentials/${credential._id}`}
            target={"_blank"}
            color={"#023AFF"}
            textDecoration="underline"
          >
            View Credential
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default OnChainCredentialsCard;
