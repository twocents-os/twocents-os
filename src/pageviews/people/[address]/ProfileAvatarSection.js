import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Text, Flex, useDisclosure, Box } from "@chakra-ui/react";
import React from "react";
import frontUtils from "@src/shared/front-utils";
import ImpactModal from "@src/pageviews/people/[address]/ImpactModal";

const ProfileAvatarSection = ({ profile, poaps, snapshots, ...props }) => {
  const {
    isOpen: isImpactModalOpen,
    onOpen: onImpactModalMdoalOpen,
    onClose: onImpactModalMdoalClose,
  } = useDisclosure();
  const handleImpactClick = () => {
    onImpactModalMdoalOpen();
  };
  return (
    <Flex alignItems={"center"} justifyContent="start" w="100%" {...props}>
      <Box position={"relative"}>
        <Image
          src={
            profile?.userData?.avatarImageUrl ||
            `/profile-icons/image ${frontUtils.getIconIndexByAddress(
              profile.address
            )}.png`
          }
          backgroundColor={"black"}
          height={["122px", "122px", "162px"]}
          width={["122px", "122px", "162px"]}
          alt="profile-picture"
          borderRadius="50%"
          position={"relative"}
          fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
        />
      </Box>
      <Flex
        backgroundColor={"#FCEB4F"}
        borderRadius={"24px"}
        pl="22px"
        pr="22px"
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"nowrap"}
        ml={"20px"}
      >
        <FontAwesomeIcon icon={faBolt} />
        <Text
          fontSize={"18px"}
          fontWeight={700}
          ml="5px"
          onClick={handleImpactClick}
          cursor={"pointer"}
        >
          {poaps.length * 5 + snapshots.length * 10}
        </Text>
        <ImpactModal
          isOpen={isImpactModalOpen}
          onClose={onImpactModalMdoalClose}
          collectedGolds={profile.collectedGolds}
          poapPonts={poaps.length * 5}
          snapshotPoints={snapshots.length * 10}
        />
      </Flex>
    </Flex>
  );
};

export default ProfileAvatarSection;
