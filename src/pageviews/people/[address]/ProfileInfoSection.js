import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import frontUtils from "@src/shared/front-utils";
import { usePageState } from "@src/shared/state";
import VerifiedTick from "@src/pageviews/people/[address]/VerifiedTick";
import ProfileSnapshotSpaceFollow from "@src/pageviews/people/[address]/ProfileSnapshotSpaceFollow";
import CeramicIdentitySection from "@src/pageviews/people/[address]/CeramicIdentitySection";

const ProfileInfoSection = ({ profile, ...props }) => {
  const [state] = usePageState();
  const [isVerified, setIsVerified] = useState(false);
  const toast = useToast();
  const handleAddressClick = () => {
    frontUtils.CopyMe(profile.address);
    toast({
      title: "Address copied in clipboard",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };
  useEffect(() => {
    if (profile?.userData?.verified) {
      setIsVerified(true);
      return;
    }
    if (!state.currentAddress) {
      return;
    }
    if (profile.address.toLowerCase() === state.currentAddress.toLowerCase()) {
      setIsVerified(state?.user?.verified || false);
    }
  }, [
    profile.address,
    profile?.userData?.verified,
    state.currentAddress,
    state?.user,
  ]);
  return (
    <Box {...props}>
      {profile?.userData?.userName && (
        <Flex alignItems={"center"}>
          <Text fontSize={["18px", "18px", "30px"]} fontWeight={700}>
            {profile.userData.userName}
          </Text>
          {isVerified && <VerifiedTick ml="10px" />}
        </Flex>
      )}
      {profile.ens && (
        <Text fontSize={["18px", "18px", "24px"]}>{profile.ens}</Text>
      )}
      <CeramicIdentitySection profile={profile} />
      <Flex alignItems={"center"} mt="10px">
        <Box display={"inline-block"}>
          <Flex
            justifyContent={"start"}
            alignItems={"center"}
            onClick={handleAddressClick}
            cursor={"pointer"}
            p="12px"
            background="#D2DAF4"
            borderRadius={"32px"}
          >
            <Text fontSize={"14px"} color={"#8C8B89"} mr="10px">
              {frontUtils.get6DigitOfAccount(profile.address)}
            </Text>
            <FontAwesomeIcon icon={faCopy} color={"#8C8B89"} />
          </Flex>
        </Box>
        <ProfileSnapshotSpaceFollow profile={profile} ml="20px" />
      </Flex>
    </Box>
  );
};

export default ProfileInfoSection;
