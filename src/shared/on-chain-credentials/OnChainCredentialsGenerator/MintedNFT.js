import {
  Box,
  Flex,
  Image,
  Text,
  Input,
  Link,
  useToast,
  Center,
} from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";
const Confetti = dynamic(import("react-confetti"), {
  ssr: false,
});
import useWindowSize from "@src/shared/useWindowSize";
import UIButton from "@src/shared/ui-button";

const MintedNFT = ({ mintedData, transactionHash, ...props }) => {
  const toast = useToast();
  const { width, height } = useWindowSize();
  return (
    <>
      {mintedData && mintedData.credential && (
        <Flex
          flexDirection={"column"}
          {...props}
          justifyContent={"center"}
          alignItems={"center"}
          mt="40px"
        >
          <Confetti run={true} width={width} height={height} recycle={false} />
          <Center>
            <Image
              src={mintedData.credential.imageUrl}
              mt="20px"
              height="215px"
              width="215px"
              alt="nft-image"
              borderRadius="8px"
              backgroundColor={"white"}
              boxShadow={
                "2px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)"
              }
              fallbackSrc="https://via.placeholder.com/600x320/1a202c/FFFFFF?Text=WebsiteBuilders.com"
            />
          </Center>
          <Text
            textAlign={"center"}
            fontSize={"24px"}
            fontWeight={700}
            mt="24px"
          >
            🤝 Credentials 🙌
          </Text>
          <Text mt="12px" textAlign={"center"}>
            {" "}
            Transaction Was Minted Successfully{" "}
          </Text>
          <Center mt="20px">
            <UIButton
              as="a"
              href={`/people/${mintedData.credential.receiverAddress}`}
            >
              Back to Profile
            </UIButton>
          </Center>
        </Flex>
      )}
    </>
  );
};
export default MintedNFT;
