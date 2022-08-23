import { Text, Flex, useDisclosure, HStack } from "@chakra-ui/react";
import React from "react";
import DaoAvatar from "@src/shared/dao/DaoAvatar";
import DaoListModal from "@src/shared/dao/DaoListModal";

const DaoAvatarList = ({ daos, daoLimit = 4, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!daos.length) {
    return null;
  }
  return (
    <>
      <HStack spacing={"-10px"} {...props}>
        {daos.slice(0, daoLimit).map((dao) => {
          return (
            <DaoAvatar
              key={dao.id}
              showTooltip={true}
              wrapInLink={true}
              hasHoverEffect={true}
              dao={dao}
              w={"40px"}
              h={"40px"}
              minW={"40px"}
              minH={"40px"}
              backgroundColor={"white"}
              border="1px solid grey"
            />
          );
        })}
        {daos.length > daoLimit && (
          <Flex
            w="40px"
            h="40px"
            backgroundColor={"white"}
            border="1px solid grey"
            borderRadius={"50%"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={onOpen}
            cursor={"pointer"}
          >
            <Text>+{daos.length - daoLimit}</Text>
          </Flex>
        )}
      </HStack>
      <DaoListModal daos={daos} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default DaoAvatarList;
