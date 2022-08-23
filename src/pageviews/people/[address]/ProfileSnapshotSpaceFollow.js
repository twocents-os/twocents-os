import { Box, HStack, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import SpaceListModal from "@src/shared/dao/DaoListModal";
import DaoAvatar from "@src/shared/dao/DaoAvatar";

const ProfileSnapshotSpaceFollow = ({ profile, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {profile.followDataFromSnapshot.data.follows &&
        profile.followDataFromSnapshot.data.follows.length > 0 && (
          <Box {...props}>
            <HStack
              spacing={"-10px"}
              backgroundColor={"#EFF0F0"}
              p="10px"
              borderRadius={"50px"}
              justifyContent={"flex-end"}
              cursor="pointer"
            >
              {profile.followDataFromSnapshot.data.follows
                .slice(0, 4)
                .map((follow) => {
                  return (
                    <Box key={follow.id}>
                      <DaoAvatar
                        showTooltip={true}
                        wrapInLink={true}
                        hasHoverEffect={true}
                        dao={follow.space}
                        w={"40px"}
                        h={"40px"}
                        minW={"40px"}
                        minH={"40px"}
                        backgroundColor={"white"}
                        border="1px solid grey"
                      />
                    </Box>
                  );
                })}
              {profile.followDataFromSnapshot.data.follows &&
                profile.followDataFromSnapshot.data.follows.length > 4 && (
                  <Flex
                    w="40px"
                    h="40px"
                    backgroundColor={"white"}
                    border="1px solid grey"
                    borderRadius={"50%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    onClick={onOpen}
                  >
                    <Text>
                      +{profile.followDataFromSnapshot.data.follows.length - 4}
                    </Text>
                  </Flex>
                )}
            </HStack>
            <SpaceListModal
              daos={profile.followDataFromSnapshot.data.follows.map(
                (f) => f.space
              )}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Box>
        )}
    </>
  );
};

export default ProfileSnapshotSpaceFollow;
