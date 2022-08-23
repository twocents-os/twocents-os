import {
  Box,
  Link,
  Container,
  Text,
  Flex,
  useToast,
  textDecoration,
  Textarea,
} from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useApi } from "@src/shared/api";
import useErrorHandler from "@src/shared/error/useErrorHandler";
import frontUtils from "@src/shared/front-utils";
import { usePageState } from "@src/shared/state";
import UIButton from "@src/shared/ui-button";
import { useWallet } from "@src/shared/useWallet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const IOUReceiverPageView = ({ iou }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "iou-receiver-pageview";
  const [messageFromReceiver, setMessageFromReceiver] = useState("");
  const [isReciver, setIsReciver] = useState(false);
  const toast = useToast();
  const [state, methods] = usePageState();
  const api = useApi();
  const router = useRouter();
  const wallet = useWallet();

  useEffect(() => {
    setIsReciver(false);
    if (!state.currentAddress) {
      return;
    }
    if (
      state.currentAddress.toLowerCase() === iou.receiverAddress.toLowerCase()
    ) {
      setIsReciver(true);
    }
  }, [iou.receiverAddress, state.currentAddress]);

  const handleAddressClick = () => {
    frontUtils.CopyMe(iou.mintedBy);
    toast({
      title: "Address copied in clipboard",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };

  const handleAccept = async () => {
    try {
      if (!state.currentAddress) {
        console.log("ask to connect");
        methods.openConnectToWallet(wallet);
        return;
      }
      await api.call("post", `/api/iou/receiver-accepts-iou`, {
        iouId: iou._id,
        messageFromReceiver: messageFromReceiver || "Thank you!",
      });
      router.push(`/iou/${iou._id}`);
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };
  const handleMessageFromReceiverChange = (e) => {
    setMessageFromReceiver(e.target.value);
  };

  return (
    <Container
      maxW={"6xl"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box maxW={"600px"} mt="40px" mb="120px">
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
          <Flex
            mt="24px"
            justifyContent={"center"}
            alignItems={"center"}
            onClick={handleAddressClick}
            cursor={"pointer"}
          >
            <Text color={"black"} mr="10px" fontWeight={700}>
              {frontUtils.get6DigitOfAccount(iou.mintedBy)}
            </Text>
            <FontAwesomeIcon icon={faCopy} color={"rgba(140, 139, 137, 0.8)"} />
          </Flex>
          <Text>
            Has gave you IOU NFT for your support and contribution in project
          </Text>

          <Link
            href={`/people/${iou.mintedBy}`}
            textDecoration="underline"
            target={"_blank"}
            textAlign={"center"}
            display={"block"}
            mt="14px"
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
            Amount
          </Text>
          <Text>Ξ {iou.amount}</Text>

          <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
            Message from project owner
          </Text>
          <Text> {iou.message}</Text>
          {((state.currentAddress && isReciver && !iou.accepted) ||
            !state.currentAddress) && (
            <Box>
              <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
                Leave a message to owner
              </Text>

              <Textarea
                placeholder="Say something nice"
                onChange={handleMessageFromReceiverChange}
                value={messageFromReceiver}
              />
              <Flex justifyContent={"center"} mt="20px">
                <UIButton onClick={handleAccept}>
                  Accept and Say &rdquo;Thank You&rdquo;
                </UIButton>
              </Flex>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default IOUReceiverPageView;
