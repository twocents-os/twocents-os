import { Box, Text, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import frontUtils from "@src/shared/front-utils";

const IOUMessageCard = ({ data, ...props }) => {
  return (
    <Box
      {...props}
      backgroundColor={"white"}
      borderRadius={"8px"}
      border="solid 3px black"
      p="5px"
      cursor={"pointer"}
    >
      <Link href={`/iou/${data._id}`} target={"_blank"}>
        <Flex>
          <Image
            src={`/profile-icons/image ${frontUtils.getIconIndexByAddress(
              data?.receiverAddress
            )}.png`}
            backgroundColor={"black"}
            height="48px"
            width="48px"
            alt="profile-picture"
            border="dashed 1px white"
            borderRadius="50%"
            fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
          />
          <Box ml="20px">
            <Link href={`/people/${data?.receiverAddress}`} target={"_blank"}>
              <Text fontWeight={600}>
                {data?.acceptedBy?.ens ||
                  frontUtils.get6DigitOfAccount(data?.receiverAddress)}
              </Text>
            </Link>
            <Text mt="10px">{data.messageFromReceiver}</Text>
          </Box>
        </Flex>
      </Link>
    </Box>
  );
};

export default IOUMessageCard;
