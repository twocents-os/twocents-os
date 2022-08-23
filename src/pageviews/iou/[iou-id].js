import {
  Box,
  Link,
  Container,
  Text,
  Flex,
  Image,
  useToast,
  Textarea,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { faCopy, faShareSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useApi } from "@src/shared/api";
import frontUtils from "@src/shared/front-utils";
import { usePageState } from "@src/shared/state";
import UIButton from "@src/shared/ui-button";
import { useWallet } from "@src/shared/useWallet";
import { useState } from "react";
import useErrorHandler from "@src/shared/error/useErrorHandler";

const IOUPageView = ({ iou }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "iou-pageview";
  const toast = useToast();
  const [state] = usePageState();
  const walletV1 = useWallet();
  const api = useApi();
  const [transactionHash, setTransactionHash] = useState(null);
  const [isBuyBackProcessing, setIsBuyBackProcessing] = useState(false);
  const [isBuyBackMade, setIsBuyBackMade] = useState(
    iou.isBuyBackMade || false
  );
  const handleAddressClick = (address) => {
    frontUtils.CopyMe(address);
    toast({
      title: "Address copied in clipboard",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };

  const handleBuyBack = async () => {
    try {
      setIsBuyBackProcessing(true);
      const hash = await walletV1.buyBack(
        iou.contract.value,
        iou.tokenId,
        iou.receiverAddress,
        iou.amount,
        setTransactionHash
      );
      await api.call("post", `/api/iou/submit-buyback-iou`, {
        iouId: iou._id,
        transactionHash: hash,
      });
      setIsBuyBackMade(true);
      setIsBuyBackProcessing(false);
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  return (
    <Container
      maxW={"6xl"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box
        maxW={"600px"}
        minW={["320px", "320px", "600px"]}
        mt="40px"
        mb="120px"
      >
        <Text
          fontWeight={700}
          fontFamily={"Pacifico"}
          fontSize={"24px"}
          fontStyle={"italic"}
        >
          a little thank you
        </Text>
        <Box
          backgroundColor={"white"}
          borderRadius={"8px"}
          border="solid 2px black"
          mt="20px"
          p="20px"
          pb="60px"
        >
          <Text
            fontWeight={700}
            fontSize={"24px"}
            mt={"20px"}
            mb="10px"
            textAlign={"center"}
          >
            {iou.name}
          </Text>
          <Center>
            <Image
              src={iou.imageUrl}
              mt="20px"
              height="325px"
              width="325px"
              alt="nft-image"
              border="dashed 1px white"
              borderRadius="13px"
              fallbackSrc="https://via.placeholder.com/600x320/1a202c/FFFFFF?Text=WebsiteBuilders.com"
            />
          </Center>
          <Text textAlign={"center"} fontFamily={"roboto"}>
            {new Date(iou.createDate).toLocaleDateString()}
          </Text>
          <Flex
            mt="24px"
            justifyContent={"start"}
            alignItems={"center"}
            onClick={() => handleAddressClick(iou.receiverAddress)}
            cursor={"pointer"}
          >
            <Text fontWeight={700} fontSize={"18px"}>
              From:
            </Text>
            <Text color={"black"} mr="10px" fontWeight={700} ml="20px">
              {frontUtils.get6DigitOfAccount(iou.mintedBy)}
            </Text>
            <Box>
              <FontAwesomeIcon
                icon={faCopy}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
            <Box
              ml="20px"
              as={"a"}
              href={`/people/${iou.mintedBy}`}
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon={faShareSquare}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
          </Flex>

          <Flex
            mt="24px"
            justifyContent={"start"}
            alignItems={"center"}
            onClick={() => handleAddressClick(iou.receiverAddress)}
            cursor={"pointer"}
          >
            <Text fontWeight={700} fontSize={"18px"}>
              To:
            </Text>
            <Text color={"black"} mr="10px" fontWeight={700} ml="20px">
              {frontUtils.get6DigitOfAccount(iou.receiverAddress)}
            </Text>
            <Box>
              <FontAwesomeIcon
                icon={faCopy}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
            <Box
              ml="20px"
              as={"a"}
              href={`/people/${iou.receiverAddress}`}
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon={faShareSquare}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
          </Flex>

          <Link
            href={`/people/${iou.mintedBy}`}
            textDecoration="underline"
            target={"_blank"}
            textAlign={"center"}
            display={"block"}
            mt="24px"
          >
            View Project Owner Profile
          </Link>

          <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
            Project
          </Text>
          <Link
            href={`/project/${iou.projectId}`}
            target={"_blank"}
            textDecor={"underline"}
          >
            <Text>{iou.project.label}</Text>
          </Link>

          <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
            Project external link
          </Text>
          <Link
            href={iou.externalLink}
            target={"_blank"}
            isExternal={true}
            textDecor={"underline"}
            overflowWrap={"anywhere"}
            wordBreak={"break-all"}
          >
            {iou.externalLink}
          </Link>

          <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
            Amount
          </Text>
          <Text>Ξ {iou.amount}</Text>

          <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
            Reason
          </Text>
          <Text> {iou.reason}</Text>
          {isBuyBackMade && (
            <Box>
              <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
                Buy back status
              </Text>
              <Text>
                Minter already bought this NFT back and paid Ξ {iou.amount}
              </Text>
            </Box>
          )}
          {state.currentAddress &&
            state.currentAddress.toLowerCase() === iou.mintedBy.toLowerCase() &&
            !isBuyBackMade && (
              <Flex
                justifyContent={"center"}
                mt="20px"
                flexDirection={"column"}
                alignItems={"center"}
              >
                {isBuyBackProcessing && (
                  <Flex
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text textAlign={"center"} fontWeight={"700"} mt="20px">
                      Processing ...
                      <br /> Please don&apos;t close this window
                    </Text>
                    <Spinner color="red.500" />
                  </Flex>
                )}
                {transactionHash && (
                  <Link
                    mt="20px"
                    href={`https://polygonscan.com/tx/${transactionHash}`}
                    target={"_blank"}
                    isExternal={true}
                    color={"black"}
                    textAlign={"center"}
                    display={"block"}
                    textDecor={"underline"}
                  >
                    See transaction on polygonscan
                  </Link>
                )}
                <UIButton
                  mt="20px"
                  onClick={handleBuyBack}
                  disabled={isBuyBackProcessing}
                >
                  Buy Back Ξ{iou.amount}
                </UIButton>
              </Flex>
            )}
        </Box>
      </Box>
    </Container>
  );
};
export default IOUPageView;
