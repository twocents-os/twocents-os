import {
  Box,
  Flex,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  chakra,
  Input,
  Textarea,
} from "@chakra-ui/react";
import UIButton from "@src/shared/ui-button";
import React, { useEffect, useState } from "react";
import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import frontUtils from "@src/shared/front-utils";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import {
  useViewerConnection,
  useClient,
  useViewerRecord,
} from "@self.id/framework";
import { usePageState } from "@src/shared/state";
import { useApi } from "@src/shared/api";
import useErrorHandler from "@src/shared/error/useErrorHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import issueVerifiedCredential from "@src/libs/issue-vc";

const VerifiedCredentialModal = ({ onClose, isOpen, profile, setDID }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "profile-VerifiedCredentialModal";
  const [connection] = useViewerConnection();
  const [skills, setSkills] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [evidenceDescription, setEvidenceDescription] = useState("");
  const client = useClient();
  const [state] = usePageState();
  const api = useApi();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const cleanSkills = skills.split(",").map((s) => s.trim());
      const { credentialId, doc: docContent } = issueVerifiedCredential({
        issuerEthAddress: state?.currentAddress,
        targetEthAddress: profile?.address,
        issuanceDate: new Date().toISOString(),
        meta: {
          skills: cleanSkills,
          evidenceUrl: evidenceUrl,
          evidenceDescription: evidenceDescription,
        },
      });

      const doc = await TileDocument.create(client.ceramic, docContent, {
        schema:
          "k3y52l7qbv1frxo5510cruhkluijtav39g4vacian4lrh7bxs8vk0b2w7pjmilqtc",
      });

      const result = await api.call("POST", `/api/did/save-vc`, {
        doc: doc.content,
        docId: doc.id.toString(),
        credentialId,
        issuerEthAddress: state?.currentAddress,
        targetEthAddress: profile?.address,
      });
      console.log("LOG:", result);
      toast({
        title: `Submitted Verified Credencitials`,
        description: `Verified Credentials Created`,
        position: "bottom-right",
        isClosable: true,
        variant: "solid",
        status: "success",
      });
      onClose();
    } catch (error) {
      errorHandler(error, [placeTag], {}, true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Verified Credentials</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CeramicConnectButton profile={profile} setDID={setDID} />
          {connection.status === "connected" && (
            <Box>
              <Box mt={"20px"}>
                <Text fontSize={"16px"} fontWeight={700}>
                  Skills <chakra.span color={"red"}> *</chakra.span>
                </Text>

                <Input
                  mt={"20px"}
                  backgroundColor="white"
                  color="black"
                  placeholder="Skills separated with comma"
                  type="text"
                  value={skills || ""}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </Box>
              <Box mt={"20px"}>
                <Text fontSize={"16px"} fontWeight={700}>
                  Evidence Url <chakra.span color={"red"}> *</chakra.span>
                </Text>

                <Input
                  mt={"20px"}
                  backgroundColor="white"
                  color="black"
                  placeholder="Evidence URL"
                  type="text"
                  value={evidenceUrl || ""}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                />
              </Box>
              <Box mt={"20px"}>
                <Text fontSize={"16px"} fontWeight={700}>
                  Evidence Description{" "}
                  <chakra.span color={"red"}> *</chakra.span>
                </Text>

                <Textarea
                  mt={"20px"}
                  backgroundColor="white"
                  color="black"
                  placeholder="Evidence description"
                  type="text"
                  value={evidenceDescription || ""}
                  onChange={(e) => setEvidenceDescription(e.target.value)}
                />
              </Box>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button type="secondary" mr={"10px"} onClick={onClose}>
            Close
          </Button>
          <UIButton onClick={handleSubmit}>Submit</UIButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

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
        errorHandler(error, [placeTag], {}, true);
      }
    };
    saveDID();
  }, [connection?.status, connection?.selfID?.id]);

  return (
    <>
      {connection.status === "connected" && (
        <UIButton
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </UIButton>
      )}

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
  const client = useClient();
  const {
    isOpen: isVerifiedCredentialModalOpened,
    onOpen: onVerifiedCredentialModalOpen,
    onClose: onVerifiedCredentialModalClose,
  } = useDisclosure();

  useEffect(() => {
    const checkIfProfileIsMine = () => {
      setIsMyProfile(
        profile?.address.toLowerCase() === state?.currentAddress?.toLowerCase()
      );
    };
    checkIfProfileIsMine();
  }, [profile?.address, state?.currentAddress]);

  const handleGenerateVC = async () => {
    onVerifiedCredentialModalOpen();
    return;
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
    <Flex mt="12px" alignItems={"center"}>
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
        <Box ml="10px">
          <UIButton onClick={handleGenerateVC}>Give VC</UIButton>
        </Box>
      )}
      <VerifiedCredentialModal
        isOpen={isVerifiedCredentialModalOpened}
        onClose={onVerifiedCredentialModalClose}
        profile={profile}
        setDID={setDID}
      />
    </Flex>
  );
};

export default CeramicIdentitySection;
