import React, { useState, useEffect } from "react";
import UIButton from "@src/shared/ui-button";
import { usePageState } from "@src/shared/state";

const SendOnChainCredentialsSection = ({ profile, ...props }) => {
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [state, methods] = usePageState();

  useEffect(() => {
    const checkIfProfileIsMine = () => {
      setIsMyProfile(
        profile?.address.toLowerCase() === state?.currentAddress?.toLowerCase()
      );
    };
    checkIfProfileIsMine();
  }, [state.currentAddress]);

  const handleClick = () => {
    if (!state.currentAddress) {
      methods.openConnectToWallet();
      return;
    }
    window.location.href = `/on-chain-credentials/generate?address=${profile?.address.toLowerCase()}`;
  };

  return (
    <>
      {!isMyProfile && (
        <UIButton
          {...props}
          backgroundColor="#f4ab6a"
          color="black"
          boxShadow="4px 4px 4px rgba(0, 0, 0, 0.25)"
          _hover={{ backgroundColor: "#f7ea82" }}
          _active={{ backgroundColor: "#f7ea82" }}
          lineHeight="32px"
          onClick={handleClick}
        >
          ✍️ Send a On Chain Credentials
        </UIButton>
      )}
    </>
  );
};
export default SendOnChainCredentialsSection;
