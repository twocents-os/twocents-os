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
import React, { useEffect, useState } from "react";
import frontUtils from "@src/shared/front-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
const Confetti = dynamic(import("react-confetti"), {
  ssr: false,
});
import useWindowSize from "@src/shared/useWindowSize";

const MintedNFT = ({ mintedData, transactionHash, ...props }) => {
  const toast = useToast();
  const [transactionScanOptions, setTransactionScannerOptions] = useState({});
  const { width, height } = useWindowSize();

  const handleAddressClick = () => {
    frontUtils.CopyMe(
      `${window.location.href.split("/").slice(0, 3).join("/")}/pof/receiver/${
        mintedData?.pof?._id
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
      .join("/")}/pof/receiver/${mintedData?.pof?._id}`;
    const twitterPostUrl = `https://twitter.com/intent/tweet?url=${linkToReward}&text=Thanks%20for%20your%20contribution%20@someone`;
    window.open(twitterPostUrl, "_blank").focus();
  };

  useEffect(() => {
    if (!transactionHash || !mintedData) {
      return;
    }
    if (
      mintedData.pof.contractAddress.toLowerCase() ===
      process.env.NEXT_PUBLIC_POLYGON_MAIN.toLowerCase()
    ) {
      setTransactionScannerOptions({
        name: "Polygonscan",
        link: `https://polygonscan.com/tx/${transactionHash}`,
      });
    }
    if (
      mintedData.pof.contractAddress.toLowerCase() ===
      process.env.NEXT_PUBLIC_ETHER_RINKEBY.toLowerCase()
    ) {
      setTransactionScannerOptions({
        name: "Etherscan (Rinkeby)",
        link: `https://rinkeby.etherscan.io/tx/${transactionHash}`,
      });
    }
    if (
      mintedData.pof.contractAddress.toLowerCase() ===
      process.env.NEXT_PUBLIC_ETHER_LOCAL.toLowerCase()
    ) {
      setTransactionScannerOptions({
        name: "Etherscan (LOCAL)",
        link: `https://localhost:3000/tx/${transactionHash}`,
      });
    }
  }, [transactionHash, mintedData]);
  return (
    <>
      {mintedData && mintedData.pof && (
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
              src={mintedData.pof.imageUrl}
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
            🤝 Friendships 🙌
          </Text>
          <Text mt="12px" textAlign={"center"}>
            {" "}
            Transaction Was Minted Successfully{" "}
          </Text>
          {transactionHash && (
            <Link
              mt="20px"
              href={transactionScanOptions.link}
              target={"_blank"}
              isExternal={true}
              color={"black"}
              textAlign={"center"}
              display={"block"}
              textDecor={"underline"}
            >
              See transaction on {transactionScanOptions.name}
            </Link>
          )}
          <Text
            textAlign={"center"}
            fontSize={"16px"}
            mt="20px"
            fontWeight={700}
          >
            Share this link with your friend so they can claim their Proof of
            Friendship NFT.
          </Text>
          <Flex w="100%" alignItems={"center"} mt="34px">
            <Input
              readOnly={true}
              autoFocus={true}
              backgroundColor="white"
              value={`${window.location.href
                .split("/")
                .slice(0, 3)
                .join("/")}/pof/receiver/${mintedData?.pof?._id}`}
            />
            <Box ml="10px" onClick={handleAddressClick} cursor={"pointer"}>
              <FontAwesomeIcon
                size="2x"
                icon={faCopy}
                color={"rgba(140, 139, 137, 0.8)"}
              />
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default MintedNFT;
