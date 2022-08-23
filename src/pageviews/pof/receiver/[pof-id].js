import {
  Box,
  Link,
  Container,
  Text,
  Flex,
  useToast,
  Textarea,
  Center,
  Image,
} from "@chakra-ui/react";
import { useApi } from "@src/shared/api";
import frontUtils from "@src/shared/front-utils";
import { usePageState } from "@src/shared/state";
import UIButton from "@src/shared/ui-button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useErrorHandler from "@src/shared/error/useErrorHandler";

const POFReceiverPageView = ({ pof }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "pof-receiver-pageview";
  const [messageFromReceiver, setMessageFromReceiver] = useState("");
  const [isReciver, setIsReciver] = useState(false);
  const toast = useToast();
  const [state, methods] = usePageState();
  const api = useApi();
  const router = useRouter();

  useEffect(() => {
    setIsReciver(false);
    if (!state.currentAddress) {
      return;
    }
    if (
      state.currentAddress.toLowerCase() === pof.receiverAddress.toLowerCase()
    ) {
      setIsReciver(true);
    }
  }, [pof.receiverAddress, state.currentAddress]);

  const handleAddressClick = () => {
    frontUtils.CopyMe(pof.mintedBy);
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
        methods.openConnectToWallet();
        return;
      }
      await api.call("post", `/api/pof/receiver-accepts-pof`, {
        pofId: pof._id,
        messageFromReceiver: messageFromReceiver || "Thank you!",
      });
      router.push(`/pof/${pof._id}`);
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };
  const handleMessageFromReceiverChange = (e) => {
    setMessageFromReceiver(e.target.value);
  };

  return (
    <Box
      background={
        "linear-gradient(173.53deg, #FFFDD9 16.1%, rgba(241, 195, 77, 0.29) 98.42%)"
      }
    >
      <Container
        maxW={"6xl"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box
          maxW={"600px"}
          mt="40px"
          mb="120px"
          minW={["300px", "300px", "600px"]}
        >
          <Box mt="20px" p="20px" pb="60px">
            <Center>
              <Image
                src={pof.imageUrl}
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
            <Flex alignItems={"center"} mt="24px" justifyContent={"center"}>
              <Text fontWeight={700} fontSize={"14px"}>
                Sender:
              </Text>

              <Link
                ml="10px"
                href={`/people/${pof.mintedBy}`}
                textDecoration="underline"
                target={"_blank"}
                textAlign={"center"}
                display={"block"}
                fontSize={"14px"}
              >
                {frontUtils.get6DigitOfAccount(pof.mintedBy)}
              </Link>
            </Flex>
            <Flex mt="24px" justifyContent={"center"} alignItems={"center"}>
              <Text
                color={"black"}
                mr="10px"
                fontWeight={700}
                fontSize={"20px"}
              >
                {pof.mintedByUserInfo.userName} sent you POF NFT
              </Text>
            </Flex>

            <Text
              fontWeight={400}
              fontSize={"20px"}
              mt={"20px"}
              mb="10px"
              textAlign={"center"}
            >
              Message: &quot; {pof.message} from project sender&quot;
            </Text>

            {((state.currentAddress && isReciver && !pof.accepted) ||
              !state.currentAddress) && (
              <Box>
                <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
                  Leave a message to sender
                </Text>

                <Textarea
                  placeholder="Say something nice"
                  onChange={handleMessageFromReceiverChange}
                  value={messageFromReceiver}
                  backgroundColor="white"
                />
                <Flex justifyContent={"center"} mt="20px">
                  <UIButton onClick={handleAccept}>Claim NFT</UIButton>
                </Flex>
              </Box>
            )}
            {state.currentAddress && !isReciver && (
              <Text
                fontWeight={700}
                fontSize="16px"
                textAlign={"center"}
                mt="10px"
              >
                Current NFT was not minted for current wallet address
              </Text>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default POFReceiverPageView;
