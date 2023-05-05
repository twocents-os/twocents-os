import { Flex, useToast, useDisclosure } from "@chakra-ui/react";
import UIButton from "@src/shared/ui-button";
import React, { useEffect, useState } from "react";
import { usePageState } from "@src/shared/state";
import { useApi } from "@src/shared/api";
import useErrorHandler from "@src/shared/error/useErrorHandler";

import { DIDSession } from "did-session";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import { ComposeClient } from "@composedb/client";
import { ethers } from "ethers";
import { definition } from "@src/shared/schemas/twocents";
import { nanoid } from "nanoid";
import { useNetwork } from "wagmi";
import { VerifiedCredentialModal } from "./VerifiedCredentialModal";

const CeramicIdentitySectionV2 = ({ profile }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "profile-CeramicIdentitySection";
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [did, setDID] = useState(null);
  const [ceramicProfile, setCeramicProfile] = useState(null);
  const [state] = usePageState();
  const api = useApi();
  const toast = useToast();
  const {
    isOpen: isVerifiedCredentialModalOpened,
    onOpen: onVerifiedCredentialModalOpen,
    onClose: onVerifiedCredentialModalClose,
  } = useDisclosure();

  const [{ data: chain }] = useNetwork();

  useEffect(() => {
    const checkIfProfileIsMine = () => {
      setIsMyProfile(
        profile?.address.toLowerCase() === state?.currentAddress?.toLowerCase()
      );
    };
    checkIfProfileIsMine();
  }, [profile?.address, state?.currentAddress]);

  useEffect(() => {
    if (!state.currentAddress) {
      return;
    }
  }, [state.currentAddress]);

  const createNewSession = async () => {
    const compose = new ComposeClient({
      ceramic: "https://ceramic.twocents.so",
      definition,
    });
    const web3 = new ethers.providers.Web3Provider(window.ethereum);

    const accountId = await getAccountId(
      web3.provider,
      state?.currentAddress?.toLowerCase()
    );
    const authMethod = await EthereumWebAuth.getAuthMethod(
      web3.provider,
      accountId
    );

    const session = await DIDSession.authorize(authMethod, {
      resources: compose.resources,
    });
    setDID(session.did);

    return session;
  };

  const fetchCeramicSessionByAddress = async () => {
    try {
      const response = await api.call(
        "get",
        `/api/did/fetch-session?address=${state.currentAddress.toLowerCase()}`
      );
      if (!response.session) {
        return null;
      }
      return response.session;
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  const saveSession = async (sessionString) => {
    try {
      await api.call("post", `/api/did/save-session`, {
        address: state.currentAddress.toLowerCase(),
        session: sessionString,
      });
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  const saveCredential = async (credential) => {
    try {
      await api.call("post", `/api/did/save-credential`, credential);
      toast({ title: "Credential issued successfully", status: "success" });
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  const handleSubmitVC = async (data) => {
    const compose = new ComposeClient({
      ceramic: "https://ceramic.twocents.so",
      definition,
    });
    compose.setDID(did);
    const credentialObject = {
      recipientAddress: profile.address.toLowerCase(),
      recipientProfileUrl: `https://app.twocents.so/people/${profile.address.toLowerCase()}`,
      recipientDID: profile.did || profile.address.toLowerCase(),
      issuerAddress: state.currentAddress.toLowerCase(),
      issuerProfileUrl: `https://app.twocents.so/people/${state.currentAddress.toLowerCase()}`,
      issuerDID: state.currentAddress.toLowerCase(),
      credentialSubject: data.subject,
      credentialDescription: data.description,
      chainId: chain?.chain?.id,
      skills: data.skills.split(","),
      contributions: data.contributions.split(","),
      credentialUrl: `https://app.twocents.so/credentials/${nanoid(10)}`, //external evidence url if needded
    };
    const variables = {
      i: {
        content: {
          ...credentialObject,
        },
      },
    };
    const gdata = await compose.executeQuery(
      `
    mutation CreateVCMutation($i:CreateTwoCentsVCInput!) {
      createTwoCentsVC(
        input: $i
      ) {
        document {
          id
          skills
          contributions
        }
      }
    }
    `,
      variables
    );
    await saveCredential({
      ...credentialObject,
      id: gdata.data.createTwoCentsVC.document.id,
    });
  };

  const fetchCeramicProfileRecord = async () => {
    try {
      const response = await api.call(
        "get",
        `/api/did/fetch-ceramic-profile?address=${state.currentAddress.toLowerCase()}`
      );
      if (!response.ceramicProfile) {
        return null;
      }
      return response.ceramicProfile;
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  const handleIssueVC = async () => {
    let session = null;
    let sessionString = await fetchCeramicSessionByAddress(
      state.currentAddress.toLowerCase()
    );
    if (sessionString) {
      session = await DIDSession.fromSession(sessionString);
      setDID(session.did);
    }
    if (!session || session.isExpired) {
      session = await createNewSession();
      await saveSession(session.serialize());
    }
    const ceramicProfileRecord = await fetchCeramicProfileRecord();
    if (ceramicProfileRecord) {
      setCeramicProfile(ceramicProfileRecord);
      onVerifiedCredentialModalOpen();
    } else {
      const ceramicProfileRecord = await createCeramicProfileForCurrentUser(
        session.did
      );
      setCeramicProfile(ceramicProfileRecord);
      onVerifiedCredentialModalOpen();
    }
  };

  const saveCeramicProfile = async (ceramicProfile) => {
    try {
      const response = await api.call(
        "post",
        `/api/did/save-ceramic-profile`,
        ceramicProfile
      );
      return response.ceramicProfile;
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  const createCeramicProfileForCurrentUser = async (sessionDID) => {
    try {
      const compose = new ComposeClient({
        ceramic: "https://ceramic.twocents.so",
        definition,
      });
      compose.setDID(sessionDID);

      const response = await api.call(
        "get",
        `/api/users/fetch-onboarding?address=${state.currentAddress.toLowerCase()}`
      );
      const { userName, bio } = response.onboardingData.init;
      const ceramicProfile = {
        userName,
        bio,
        address: state.currentAddress.toLowerCase(),
        chainId: chain?.chain?.id,
      };
      const variables = {
        i: {
          content: ceramicProfile,
        },
      };
      const gdata = await compose.executeQuery(
        `
          mutation MyMutation($i:CreateTwoCentsProfileInput!) {
            createTwoCentsProfile(
              input:$i
            ) {
              document {
                id
                userName
              }
            }
          }
        `,
        variables
      );
      const savedCeeramicProfile = await saveCeramicProfile({
        ...ceramicProfile,
        id: gdata.data.createTwoCentsProfile.document.id,
      });
      return savedCeeramicProfile;
    } catch (error) {
      errorHandler(error, [placeTag], null, false);
    }
  };

  return (
    <Flex mt="12px" alignItems={"center"}>
      {!isMyProfile && <UIButton onClick={handleIssueVC}>Issue VC</UIButton>}
      <VerifiedCredentialModal
        isOpen={isVerifiedCredentialModalOpened}
        onClose={onVerifiedCredentialModalClose}
        profile={profile}
        onSubmit={handleSubmitVC}
      />
    </Flex>
  );
};

export default CeramicIdentitySectionV2;
