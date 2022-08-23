import { Box, Flex, Image, Text, Link, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import frontUtils from "@src/shared/front-utils";

const POFListMini = ({ pofList, ...props }) => {
  return (
    <Flex {...props} flexWrap="wrap">
      <Wrap spacing={"20px"}>
        {pofList.map((pof) => (
          <WrapItem key={pof._id}>
            <Box>
              <Flex flexDirection={"column"} w="200px">
                <Link
                  href={`/pof/${pof._id}`}
                  display="flex"
                  justifyContent={"center"}
                >
                  <Image
                    src={
                      pof.receiverUser?.avatarImageUrl ||
                      `/profile-icons/image ${frontUtils.getIconIndexByAddress(
                        pof.resolvedReceiverAddress
                      )}.png`
                    }
                    backgroundColor={"#FFEBCD"}
                    boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)"
                    objectFit={"contain"}
                    height="118px"
                    width="118px"
                    alt="profile-picture"
                    fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
                    borderRadius={"12px"}
                    alignSelf="center"
                  />
                </Link>
                <Link
                  href={`/people/${pof.resolvedReceiverAddress}`}
                  isExternal={false}
                  mt="12px"
                >
                  <Text
                    textOverflow={"ellipsis"}
                    whiteSpace="nowrap"
                    overflow={"hidden"}
                    textAlign={"center"}
                  >
                    {pof?.receiverUserInfo?.userName ||
                      frontUtils.get6DigitOfAccount(
                        pof.resolvedReceiverAddress
                      )}
                  </Text>
                </Link>
              </Flex>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};

export default POFListMini;
