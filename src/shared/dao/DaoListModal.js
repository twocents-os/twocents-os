import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Link,
} from "@chakra-ui/react";
import React from "react";
import DaoAvatar from "@src/shared/dao/DaoAvatar";

const DaoListModal = ({ onClose, isOpen, daos, ...props }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>DAOs</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box maxH={"360px"} overflow="scroll">
            <Stack>
              {daos.map((dao) => {
                return (
                  <Box
                    key={`dao-modal-${dao.id}`}
                    borderBottom="1px solid #F2F3F3"
                  >
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Link isExternal={false} href={`/daos/${dao.id}`}>
                        <Flex justifyContent={"start"} alignItems={"center"}>
                          <DaoAvatar
                            showTooltip={false}
                            wrapInLink={false}
                            hasHoverEffect={false}
                            dao={dao}
                            w={"40px"}
                            h={"40px"}
                            minW={"40px"}
                            minH={"40px"}
                            backgroundColor={"white"}
                            border="1px solid grey"
                          />
                          <Text ml="10px">{dao.name}</Text>
                        </Flex>
                      </Link>
                      <Text>{dao.followersCount} People</Text>
                    </Flex>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DaoListModal;
