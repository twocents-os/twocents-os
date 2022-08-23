import UIButton from "@src/shared/ui-button";
import { Box, Flex, useDisclosure, Text, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePageState } from "@src/shared/state";
import TwitterVerificationModal from "@src/pageviews/people/[address]/TwitterVerificationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const ProfileActionSection = ({ profile, ...props }) => {
  const [state, methods] = usePageState();
  const [canVerify, setCanVerify] = useState(false);
  const {
    isOpen: isVerificationModalOpen,
    onOpen: onVerificationMdoalOpen,
    onClose: onVerificationMdoalClose,
  } = useDisclosure();

  useEffect(() => {
    const decideIfCanVerify = () => {
      setCanVerify(
        !profile?.userData?.verified &&
          profile?.address.toLowerCase() ===
            state?.currentAddress?.toLowerCase()
      );
    };
    decideIfCanVerify();
  }, [state.currentAddress]);

  const handleVerifyClick = () => {
    if (!state.currentAddress) {
      methods.openConnectToWallet();
      return;
    }
    const twitterPostUrl = `https://twitter.com/intent/tweet?text=I'm%20verifying%20myself%20for%20@TwoCentsPrtcl%20${state.currentAddress}`;
    window.open(twitterPostUrl, "_blank").focus();

    onVerificationMdoalOpen();
  };

  return (
    <Flex
      mt={["20px", "20px", "20px", "unset"]}
      justifyContent={"center"}
      alignItems={"center"}
      {...props}
    >
      <HStack w="100%">
        {canVerify && (
          <UIButton type="secondary" onClick={handleVerifyClick} w="180px">
            <Text mr="5px">Verify Twitter</Text>
            <FontAwesomeIcon icon={faTwitter} color="#00acee" />
          </UIButton>
        )}
        <TwitterVerificationModal
          isOpen={isVerificationModalOpen}
          onClose={onVerificationMdoalClose}
        />
      </HStack>
    </Flex>
  );
};

export default ProfileActionSection;
