import { Box, Text, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import frontUtils from "@src/shared/front-utils";

const FeedbackCard = ({ feedback, ...props }) => {
  return (
    <Flex
      {...props}
      backgroundColor={"white"}
      borderRadius={"8px"}
      border="solid 3px black"
      p="5px"
      cursor={"pointer"}
    >
      <Flex>
        <Link href={`/people/${feedback?.submittedBy}`} target={"_blank"}>
          <Image
            src={
              feedback.userInfo.avatarImageUrl ||
              `/profile-icons/image ${frontUtils.getIconIndexByAddress(
                feedback?.submittedBy
              )}.png`
            }
            backgroundColor={"black"}
            height="48px"
            width="48px"
            maxW={"48px"}
            maxH={"48px"}
            alt="profile-picture"
            borderRadius="50%"
            fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
          />
        </Link>
        <Box ml="20px">
          <Link href={`/people/${feedback?.submittedBy}`} target={"_blank"}>
            <Flex>
              <Text fontWeight={600}>{feedback.userInfo.userName}</Text>
              <Text fontWeight={600} color="grey" ml="10px">
                ({frontUtils.get6DigitOfAccount(feedback?.submittedBy)})
              </Text>
            </Flex>
          </Link>
          <Text mt="10px">{feedback.feedback}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FeedbackCard;
