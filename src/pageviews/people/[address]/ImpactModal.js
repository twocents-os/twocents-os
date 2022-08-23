import {
  Box,
  Image,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";

const ImpactModal = ({
  isOpen,
  onClose,
  collectedGolds,
  poapPonts,
  snapshotPoints,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign={"center"} fontSize={"24px"}>
            Your impact is
          </Text>
          <Text textAlign={"center"} mt="32px" fontSize={"30px"}>
            {collectedGolds + poapPonts + snapshotPoints}
          </Text>
          <Text fontSize={"14px"} textAlign={"center"} mt="24px">
            Your impact is calculated by how active you are with Web3
            activities. This is currently calculated based on Snapshot
            governance voting, POAPs claimed and Guilds activity.
          </Text>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody mb="140px">
          <Box textAlign={"center"} mt="48px">
            <Flex alignItems={"center"}>
              <Flex
                flexGrow={1}
                flexDirection={"column"}
                justifyContent={"start"}
                alignItems={"start"}
                mr="20px"
              >
                <Text fontSize={"24px"} fontWeight={700} textAlign={"left"}>
                  Snapshot Activity
                </Text>
                <Text
                  fontWeight={600}
                  fontSize={"14px"}
                  mt="24px"
                  textAlign={"left"}
                >
                  10 points gained for each vote you have made on Snapshot.
                </Text>
                <Flex alignItems={"center"} mt="24px">
                  <Image
                    alt="snapshot-votes"
                    src="/icons/icon-z.png"
                    w="22px"
                    h="26px"
                  />
                  <Text fontWeight={700} fontSize={"14px"} color={"#EBB53E"}>
                    Vote on Snapshot
                  </Text>
                </Flex>
              </Flex>
              <Box>
                <Text fontWeight={700} fontSize={"24px"} color={"#EBB53E"}>
                  {snapshotPoints || 0}
                </Text>
              </Box>
            </Flex>

            <Flex alignItems={"center"} mt="34px">
              <Flex
                flexGrow={1}
                flexDirection={"column"}
                justifyContent={"start"}
                alignItems={"start"}
                mr="20px"
              >
                <Text fontSize={"24px"} fontWeight={700} textAlign={"left"}>
                  Proof Of Attendance Protocol (POAP)
                </Text>
                <Text
                  fontWeight={600}
                  fontSize={"14px"}
                  mt="24px"
                  textAlign={"left"}
                >
                  5 points gained for each POAP you attain.
                </Text>
                <Flex alignItems={"center"} mt="24px">
                  <Image
                    alt="poap-votes"
                    src="/icons/icon-poap.png"
                    w="22px"
                    h="26px"
                  />
                  <Text fontWeight={700} fontSize={"14px"} color={"#EBB53E"}>
                    Collect POAPs
                  </Text>
                </Flex>
              </Flex>
              <Box>
                <Text fontWeight={700} fontSize={"24px"} color={"#EBB53E"}>
                  {poapPonts || 0}
                </Text>
              </Box>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImpactModal;
