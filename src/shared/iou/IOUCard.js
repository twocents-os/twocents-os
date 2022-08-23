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

const IOUCard = ({ iou, ...props }) => {
  const [state] = usePageState();
  const toast = useToast();
  const handleLinkCopyClick = () => {
    frontUtils.CopyMe(
      `${window.location.href.split("/").slice(0, 3).join("/")}/iou/receiver/${
        iou?._id
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
      .join("/")}/iou/receiver/${iou?._id}`;
    const twitterPostUrl = `https://twitter.com/intent/tweet?url=${linkToReward}&text=Thanks%20for%20your%20contribution%20@someone`;
    window.open(twitterPostUrl, "_blank").focus();
  };
  const getIOUStatus = () => {
    let status = "Pending";
    if (iou.transactionHash) {
      status = "Minted";
    }
    if (iou.accepted) {
      status = "Accepted";
    }
    if (iou.isBuyBackMade) {
      status = "Reward Sent";
    }
    return status;
  };
  return (
    <Box
      {...props}
      backgroundColor={"white"}
      borderRadius={"8px"}
      border="solid 3px black"
      p="5px"
      pb={"20px"}
      pt={"20px"}
    >
      <Flex
        flexDirection={["column", "column", "row"]}
        alignItems={["center", "center", "center"]}
      >
        <Link
          href={`/iou/${iou._id}`}
          target={"_blank"}
          mt={["20px", "20px", "unset"]}
        >
          <Image
            src={iou.imageUrl}
            backgroundColor={"black"}
            height="148px"
            width="148px"
            alt="profile-picture"
            borderRadius="20px"
            fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
          />
        </Link>
        <Box ml="20px" mt={["20px", "20px", "20px"]}>
          <Flex>
            <Text>Given To:</Text>
            <Link
              href={`/people/${iou?.receiverAddress}`}
              target={"_blank"}
              ml="10px"
              display={"flex"}
            >
              <Text fontWeight={600}>
                {iou?.acceptedBy?.ens ||
                  frontUtils.get6DigitOfAccount(iou?.receiverAddress)}
              </Text>
              <Image
                ml="20px"
                src={`/profile-icons/image ${frontUtils.getIconIndexByAddress(
                  iou?.receiverAddress
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
          <Flex alignItems={"center"} mt="10px">
            <Text fontWeight={600}>IOU</Text>
            <Text ml="10px">{iou.reason}</Text>
          </Flex>
          <Flex alignItems={"center"} mt="10px">
            <Text fontWeight={600}>Redeemable</Text>
            <Text ml="10px">for Ξ{iou.amount} WETH</Text>
          </Flex>
          <Flex alignItems={"center"} mt="10px">
            <Text fontWeight={600}>Status</Text>
            <Text ml="10px">{getIOUStatus()}</Text>
          </Flex>
          {state.currentAddress &&
            state.currentAddress.toLowerCase() ===
              iou.mintedBy.toLowerCase() && (
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
                      .join("/")}/iou/receiver/${iou?._id}`}
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
                  <Box
                    ml="10px"
                    onClick={handleTwitterShareClick}
                    cursor={"pointer"}
                  >
                    <FontAwesomeIcon
                      size="2x"
                      icon={faTwitter}
                      color={"#3babe2"}
                    />
                  </Box>
                </Flex>
              </Box>
            )}
          <Link
            href={`/iou/${iou._id}`}
            target={"_blank"}
            _hover={{ textDecoration: "unset" }}
          >
            <UIButton mt="20px">View IOU NFT</UIButton>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default IOUCard;
