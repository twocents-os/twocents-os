import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ProfileSelectedTabDesktop = ({ selectedTab, ...props }) => {
  if (!selectedTab) {
    return null;
  }
  const RenderComponent = selectedTab.component;
  return (
    <Box display={["none", "none", "block"]} {...props}>
      {selectedTab && (
        <Box>
          <Flex justifyContent={"start"} alignItems="center" mb="24px">
            {selectedTab.iconPath && (
              <Image
                src={selectedTab.iconPath}
                alt="item-icon"
                w="24px"
                height={"24px"}
              />
            )}
            {!selectedTab.iconPath && (
              <FontAwesomeIcon
                icon={selectedTab.icon}
                color="#0057B7"
                size="lg"
              />
            )}
            <Text ml="10px" fontWeight={700} fontSize="24px" color={"#0057B7"}>
              {selectedTab.title}{" "}
            </Text>
          </Flex>
          <RenderComponent {...selectedTab.props} />
        </Box>
      )}
    </Box>
  );
};
export default ProfileSelectedTabDesktop;
