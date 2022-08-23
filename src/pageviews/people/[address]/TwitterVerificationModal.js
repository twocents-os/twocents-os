import UIButton from "@src/shared/ui-button";
import {
  Box,
  Link,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { usePageState } from "@src/shared/state";
import { useApi } from "@src/shared/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import useErrorHandler from "@src/shared/error/useErrorHandler";

const TwitterVerificationModal = ({ isOpen, onClose }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "profile-TwitterVerificationModal";
  const [tweetUrl, setTweetUrl] = useState("");
  const api = useApi();
  const toast = useToast();
  const [state, methods] = usePageState();
  const handleVerify = async () => {
    try {
      const tweetId = tweetUrl.split("/").at(-1).split("?")[0];
      await api.call("post", `/api/users/verify-user-by-twitter`, {
        tweetId,
        address: state.currentAddress,
      });
      methods.setUserAsVerified();
      toast({
        title: "Verification processed successfully ",
        description: `Verification processed successfully`,
        position: "bottom-right",
        isClosable: true,
        variant: "solid",
        status: "success",
      });
      onClose();
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };
  const handleUrlChange = (e) => {
    setTweetUrl(e.target.value);
  };
  const postOnTwitter = () => {
    const twitterPostUrl = `https://twitter.com/intent/tweet?text=I'm%20verifying%20myself%20for%20@TwoCentsPrtcl%20${state.currentAddress}`;
    window.open(twitterPostUrl, "_blank").focus();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Enter Tweet URL</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Verify your account through Twitter via a tweet</Text>
          <Input
            mt="20px"
            type={"url"}
            value={tweetUrl}
            autoFocus={true}
            placeholder="https://twitter.com/user/status/09qu40"
            onChange={handleUrlChange}
          />
          <Box textAlign={"center"} mt="20px">
            <Link
              href="https://help.twitter.com/en/using-twitter/tweet-and-moment-url"
              textAlign={"center"}
              fontWeight={600}
              textDecoration={"underline"}
            >
              How do I get the Twitter URL?
            </Link>
          </Box>
          <Center mt="20px">
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Text>Post Tweet</Text>
              <Button onClick={postOnTwitter} ml="10px">
                <FontAwesomeIcon icon={faTwitter} />
              </Button>
            </Flex>
          </Center>
        </ModalBody>

        <ModalFooter>
          <UIButton colorScheme="blue" mr={3} onClick={handleVerify}>
            Verify
          </UIButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TwitterVerificationModal;
