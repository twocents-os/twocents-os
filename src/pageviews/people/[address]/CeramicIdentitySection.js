import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import UIButton from "@src/shared/ui-button";
import React, { useEffect, useState } from "react";
import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import frontUtils from "@src/shared/front-utils";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import {
  useViewerConnection,
  useClient,
  useViewerID,
  useViewerRecord,
} from "@self.id/framework";
import { usePageState } from "@src/shared/state";
import { useApi } from "@src/shared/api";
import useErrorHandler from "@src/shared/error/useErrorHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CeramicConnectButton({ profile, setDID }) {
  const errorHandler = useErrorHandler();
  const placeTag = "profile-CeramicConnectButton";
  const [connection, connect, disconnect] = useViewerConnection();
  const [state] = usePageState();
  const record = useViewerRecord("basicProfile");
  const api = useApi();
  const toast = useToast();

  useEffect(() => {
    if (connection.status !== "connected" || !connection.selfID.id) {
      return;
    }

    const saveDID = async () => {
      try {
        await api.call("POST", `/api/users/save-user-did`, {
          did: connection.selfID.id,
          address: state.currentAddress.toLowerCase(),
        });
        await record.merge({
          name: profile.userData.userName,
          description: profile.userData.bio,
        });
        setDID(connection.selfID.id);
        toast({
          title: `Updated`,
          description: `Creamic Identity Created`,
          position: "bottom-right",
          isClosable: true,
          variant: "solid",
          status: "success",
        });
      } catch (error) {
        errorHandler(error, [placeTag], {}, false);
      }
    };
    saveDID();
  }, [connection?.status, connection?.selfID?.id]);

  return (
    <>
      {/* {connection.status === "connected" && (
        <UIButton
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </UIButton>
      )} */}

      {connection.status !== "connected" && (
        <UIButton
          disabled={connection.status === "connecting"}
          onClick={async () => {
            await connect(
              new EthereumAuthProvider(window.ethereum, state.currentAddress)
            );
          }}
        >
          Ceramic Connect
        </UIButton>
      )}
    </>
  );
}

// const SetRecordName = ()=>{
//   const record = useViewerRecord("basicProfile");

//   return (
//     <Box>
//       <Text>update name</Text>
//       {/* do on onboarding after connecting identity */}
//       <UIButton
//         disabled={!record.isMutable || record.isMutating}
//         onClick={async () => {
//           await record.merge({ name: "Alice" });
//         }}
//       >
//         Set name
//       </UIButton>
//     </Box>
//   );

// }

const CeramicIdentitySection = ({ profile }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "profile-CeramicIdentitySection";
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [did, setDID] = useState();
  const record = useViewerRecord("basicProfile");
  const [state] = usePageState();
  const api = useApi();
  const toast = useToast();

  useEffect(() => {
    const checkIfProfileIsMine = () => {
      setIsMyProfile(
        profile?.address.toLowerCase() === state?.currentAddress?.toLowerCase()
      );
    };
    checkIfProfileIsMine();
  }, [profile?.address, state?.currentAddress]);

  const handleGenerateVC = () => {
    alert("soon");
  };

  useEffect(() => {
    if (!state.currentAddress) {
      return;
    }
    const fetchDidsOfAddress = async () => {
      try {
        const response = await api.call(
          "get",
          `/api/users/fetch-dids-by-address?address=${state.currentAddress}`
        );
        setDID(response.dids[0] || null);
      } catch (error) {
        errorHandler(error, [placeTag]);
      }
    };
    fetchDidsOfAddress();
  }, [state.currentAddress]);

  const handleDidClick = () => {
    frontUtils.CopyMe(did);
    toast({
      title: "DID copied in clipboard",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <Flex mt="12px">
      {isMyProfile && !did && (
        <CeramicConnectButton profile={profile} setDID={setDID} />
      )}
      {isMyProfile && did && (
        <Flex
          border="1px solid black"
          backgroundColor="#ffebc6"
          justifyContent={"start"}
          alignItems={"center"}
          p="12px"
          borderRadius={"32px"}
          onClick={handleDidClick}
          cursor="pointer"
        >
          <Text mr="6px">{frontUtils.get6DigitOfDid(did)}</Text>
          <FontAwesomeIcon icon={faCopy} color={"#8C8B89"} />
        </Flex>
      )}
      {!isMyProfile && (
        <Box>
          <UIButton onClick={handleGenerateVC}>Give VC</UIButton>
        </Box>
      )}
    </Flex>
  );
};
export default CeramicIdentitySection;
