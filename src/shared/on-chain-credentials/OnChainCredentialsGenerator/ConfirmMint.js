import { Button, Flex, Image, Text, useToast, Center } from "@chakra-ui/react";
import React from "react";
import UIButton from "@src/shared/ui-button";
import { useApi } from "@src/shared/api";
import { useWallet } from "@src/shared/useWallet";
import useErrorHandler from "@src/shared/error/useErrorHandler";
import { ethers } from "ethers";

const ConfirmMint = ({
  credentialData,
  changeState,
  setTransactionHash,
  setMintedData,
  ...props
}) => {
  const errorHandler = useErrorHandler();
  const placeTag = "OnChainCredentialsGenerator-ConfirmMint";
  const walletV1 = useWallet();
  const api = useApi();
  const toast = useToast();

  if (!credentialData || !credentialData.name) {
    return null;
  }

  const handleSubmit = async () => {
    try {
      changeState("minting");
      let mintParams = null;
      let mintResponse = null;

      switch (credentialData.contractType) {
        case "ERC721":
          mintParams = {
            address: credentialData.receiverAddress,
            name: credentialData.name,
            description: credentialData.description,
            image: credentialData.imageUrl,
          };
          mintResponse = await walletV1.mint721(
            credentialData.contractAddress,
            mintParams
          );
          break;
        case "ERC1155":
          mintParams = {
            address: credentialData.receiverAddress,
            name: credentialData.name,
            description: credentialData.description,
            image: credentialData.imageUrl,
            tokenId: Number(credentialData.tokenId),
          };
          mintResponse = await walletV1.mint1155(
            credentialData.contractAddress,
            mintParams
          );
          break;
        case "ERC20":
          const amount = ethers.utils.parseUnits(credentialData.amount, 18);
          mintParams = {
            address: credentialData.receiverAddress,
            amount,
          };
          mintResponse = await walletV1.mint20(
            credentialData.contractAddress,
            mintParams
          );
          break;

        default:
          throw new Error("wrong contract type");
      }

      const { tokenId, hash: transactionHash } = mintResponse;

      const response = await api.call(
        "post",
        `/api/on-chain-credentials/submit-on-chain-credentials`,
        {
          ...credentialData,
          ...(tokenId && { tokenId }),
          transactionHash,
        }
      );
      setMintedData(response);
      setTransactionHash(transactionHash);
      changeState("minted");
    } catch (error) {
      changeState("generate");
      errorHandler(error, [placeTag]);
    }
  };

  const handleBackButton = () => {
    changeState("generate");
  };

  return (
    <Flex
      flexDirection={"column"}
      {...props}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text textAlign={"center"} fontSize={"24px"} fontWeight={700}>
        Review NFT Creation
      </Text>
      <Center>
        <Image
          src={credentialData.imageUrl}
          mt="20px"
          h="215px"
          w="215px"
          alt="nft-image"
          boxShadow={
            "4px 4px 4px rgba(0, 0, 0, 0.25), -4px -4px 4px rgba(0, 0, 0, 0.25)"
          }
          backgroundColor="white"
          borderRadius="8px"
          objectFit={"contain"}
          fallbackSrc="https://via.placeholder.com/600x320/1a202c/FFFFFF?Text=WebsiteBuilders.com"
        />
      </Center>

      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Name
      </Text>
      <Text>{credentialData.name}</Text>
      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Description
      </Text>
      <Text> {credentialData.description}</Text>
      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Project
      </Text>
      <Text>{credentialData.project.label}</Text>

      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Receiver Address
      </Text>
      <Text color={"black"} fontWeight={700} fontSize="11px">
        {credentialData.receiverAddress}
      </Text>

      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Message
      </Text>
      <Text> {credentialData.message}</Text>
      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Blockchain
      </Text>
      <Text> {credentialData.contractAddress}</Text>
      <Center mt="40px">
        <Button onClick={handleBackButton}>Edit</Button>
        <UIButton ml="20px" onClick={handleSubmit}>
          Mint
        </UIButton>
      </Center>
    </Flex>
  );
};
export default ConfirmMint;
