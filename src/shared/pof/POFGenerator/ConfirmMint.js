import { Button, Flex, Image, Text, useToast, Center } from "@chakra-ui/react";
import React from "react";
import UIButton from "@src/shared/ui-button";
import { useApi } from "@src/shared/api";
import { useWallet } from "@src/shared/useWallet";
import useErrorHandler from "@src/shared/error/useErrorHandler";

const ConfirmMint = ({
  pofData,
  changeState,
  setTransactionHash,
  setMintedData,
  ...props
}) => {
  const errorHandler = useErrorHandler();
  const placeTag = "pof-ConfirmMint";
  const walletV1 = useWallet();
  const api = useApi();
  const toast = useToast();

  if (!pofData || !pofData.name) {
    return null;
  }

  const handleSubmit = async () => {
    try {
      changeState("minting");

      const { tokenId, transactionHash } = await walletV1.mintPOF(
        pofData.contractAddress,
        pofData.resolvedReceiverAddress,
        pofData.name,
        pofData.description,
        // "ipfs://bafybeidpasutw5a4cqnvpaj2gzdugw4ytre2tajiz2sn2v2jqqm5bijp64/proof1.png"
        pofData.imageUrl
      );

      const response = await api.call("post", `/api/pof/submit-pof`, {
        ...pofData,
        tokenId,
        transactionHash,
      });
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
          src={pofData.imageUrl}
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
      <Text>{pofData.name}</Text>
      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Description
      </Text>
      <Text> {pofData.description}</Text>
      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Project
      </Text>
      <Text>{pofData.project.label}</Text>

      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Receiver Address
      </Text>
      <Text color={"black"} fontWeight={700} fontSize="11px">
        {pofData.receiverAddress}
      </Text>
      <Text color={"black"} fontWeight={700} fontSize="11px">
        {pofData.resolvedReceiverAddress}
      </Text>

      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Message
      </Text>
      <Text> {pofData.message}</Text>
      <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
        Blockchain
      </Text>
      <Text> {pofData.contract.label}</Text>
      <Center mt="40px">
        <Button onClick={handleBackButton}>Edit</Button>
        <UIButton ml="20px" onClick={handleSubmit}>
          Send Proof of Friendship
        </UIButton>
      </Center>
    </Flex>
  );
};
export default ConfirmMint;
