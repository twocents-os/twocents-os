import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePageState } from "@src/shared/state";
import frontUtils from "@src/shared/front-utils";

const CoverSection = ({ profile }) => {
  const [state] = usePageState();
  const [canManageProfile, setCanManageProfile] = useState(false);
  useEffect(() => {
    if (!profile || !state.currentAddress) {
      return;
    }
    setCanManageProfile(
      profile.address.toLowerCase() === state.currentAddress.toLowerCase()
    );
  }, [profile, state.currentAddress]);

  const handleEditProfile = () => {
    let path = window.location.href.split("?")[0];
    window.location.href = `${path}/edit`;
  };

  return (
    <Box
      h={"248px"}
      background={
        !profile?.userData?.coverImageUrl &&
        frontUtils.getGradientBackgroundByAddress(profile.address)
      }
      textAlign="right"
      backgroundImage={
        profile?.userData?.coverImageUrl && profile?.userData?.coverImageUrl
      }
      backgroundPosition={"center"}
    >
      {canManageProfile && (
        <Button mr="20px" mt="20px" onClick={handleEditProfile}>
          Edit My Profile
        </Button>
      )}
    </Box>
  );
};

export default CoverSection;
