import {
  Box,
  useToast,
  Text,
  Flex,
  Image,
  Input,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { usePageState } from "@src/shared/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import frontUtils from "@src/shared/front-utils";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import UIButton from "@src/shared/ui-button";

const POFCard = ({ pof, ...props }) => {
  const [state] = usePageState();
  const toast = useToast();
  const handleLinkCopyClick = () => {
    frontUtils.CopyMe(
      `${window.location.href.split("/").slice(0, 3).join("/")}/pof/receiver/${
        pof?._id
      }`
    );
    toast({
      title: "Copied in clipboard",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };

  const handleTwitterShareClick = () => {
    const linkToReward = `${window.location.href
      .split("/")
      .slice(0, 3)
      .join("/")}/pof/receiver/${pof?._id}`;
    const twitterPostUrl = `https://twitter.com/intent/tweet?url=${linkToReward}&text=Thanks%20for%20your%20contribution%20@someone`;
    window.open(twitterPostUrl, "_blank").focus();
  };
  const getPOFStatus = () => {
    let status = "Pending";
    if (pof.transactionHash) {
      status = "Minted";
    }
    if (pof.accepted) {
      status = "Accepted";
    }
    if (pof.isBuyBackMade) {
      status = "Reward Sent";
    }
    return status;
  };
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
            href={`/pof/${pof._id}`}
            target={"_blank"}
            mt={["20px", "20px", "unset"]}
          >
            <Image
              src={pof.imageUrl}
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
              {getPOFStatus()}
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
                {pof.name}
              </Text>
            </Flex>
            <Flex mt="8px">
              <Link
                href={`/people/${pof?.receiverAddress}`}
                target={"_blank"}
                display={"flex"}
                alignItems="center"
              >
                <Text fontWeight={600} fontSize={"12px"}>
                  {frontUtils.get6DigitOfAccount(pof?.resolvedReceiverAddress)}
                </Text>
                <Image
                  ml="20px"
                  src={`/profile-icons/image ${frontUtils.getIconIndexByAddress(
                    pof?.resolvedReceiverAddress
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
            <Flex alignItems={"center"} mt="12px">
              <Text fontSize={"13px"} noOfLines={4}>
                {pof.description}
              </Text>
            </Flex>
          </Box>
          <Link
            fontSize={"14.5px"}
            fontWeight={700}
            href={`/pof/${pof._id}`}
            target={"_blank"}
            color={"#023AFF"}
            textDecoration="underline"
          >
            View Friendship
          </Link>
          {state.currentAddress &&
            state.currentAddress.toLowerCase() ===
              pof.mintedBy.toLowerCase() && (
              <Box>
                <Text fontWeight={600} mt="24px">
                  Tell your friend
                </Text>
                <Flex w="100%" alignItems={"center"} mt="10px">
                  <Input
                    readOnly={true}
                    value={`${window.location.href
                      .split("/")
                      .slice(0, 3)
                      .join("/")}/pof/receiver/${pof?._id}`}
                  />
                  <Box
                    ml="10px"
                    onClick={handleLinkCopyClick}
                    cursor={"pointer"}
                  >
                    <FontAwesomeIcon
                      size="2x"
                      icon={faCopy}
                      color={"rgba(140, 139, 137, 0.8)"}
                    />
                  </Box>
                  {/* <Box
                    ml="10px"
                    onClick={handleTwitterShareClick}
                    cursor={"pointer"}
                  >
                    <FontAwesomeIcon
                      size="2x"
                      icon={faTwitter}
                      color={"#3babe2"}
                    />
                  </Box> */}
                </Flex>
              </Box>
            )}
          {/* <Link
            href={`/pof/${pof._id}`}
            target={"_blank"}
            _hover={{ textDecoration: "unset" }}
          >
            <UIButton mt="20px">View POF NFT</UIButton>
          </Link> */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default POFCard;
