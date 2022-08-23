import UIButton from "@src/shared/ui-button";
import { useToast, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useApi } from "@src/shared/api";
import useErrorHandler from "@src/shared/error/useErrorHandler";
import { usePageState } from "@src/shared/state";

const ProfileFollowButton = ({ address, ...props }) => {
  const api = useApi();
  const [state, methods] = usePageState();
  const toast = useToast();
  const placeTag = "profile-ProfileFollowButton";
  const [followingThisProfile, setFollowingThisProfile] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const errorHandler = useErrorHandler();

  useEffect(() => {
    const checkIfProfileIsMine = () => {
      setIsMyProfile(
        address.toLowerCase() === state?.currentAddress?.toLowerCase()
      );
    };
    checkIfProfileIsMine();
  }, [state.currentAddress]);

  useEffect(() => {
    if (!state.currentAddress) {
      return;
    }
    const fetchFollowingStatus = async () => {
      const response = await api.call(
        "get",
        `/api/users/following-status?from=${state.currentAddress.toLowerCase()}&to=${address.toLowerCase()}`
      );
      setFollowingThisProfile(response.isFollowing);
    };

    fetchFollowingStatus();
  }, [state.currentAddress]);

  const handleFollow = async () => {
    try {
      if (!state.currentAddress) {
        methods.openConnectToWallet();
        return;
      }
      await api.call("post", `/api/users/follow-user`, {
        from: state.currentAddress.toLowerCase(),
        to: address.toLowerCase(),
      });
      toast({
        title: `Following`,
        description: `Now you are following`,
        position: "bottom-right",
        isClosable: true,
        variant: "solid",
        status: "success",
      });
      setFollowingThisProfile(true);
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  const handleUnfollow = async () => {
    try {
      if (!state.currentAddress) {
        return;
      }
      await api.call("post", `/api/users/unfollow-user`, {
        from: state.currentAddress.toLowerCase(),
        to: address.toLowerCase(),
      });
      setFollowingThisProfile(false);
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  return (
    <>
      {!isMyProfile && (
        <UIButton
          w="140px"
          {...props}
          onClick={!followingThisProfile ? handleFollow : handleUnfollow}
        >
          {followingThisProfile && <Text>Following</Text>}
          {!followingThisProfile && <Text>Follow</Text>}
        </UIButton>
      )}
    </>
  );
};

export default ProfileFollowButton;
