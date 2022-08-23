import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

const AboutMeSection = ({ profile, ...props }) => {
  if (!profile.userData) {
    return null;
  }
  return (
    <Box {...props}>
      <Text fontWeight={700} fontSize="24px">
        About Me
      </Text>
      <Text fontSize={"14.4px"} mt="12px" whiteSpace={"pre-wrap"}>
        {profile.userData?.bio}
      </Text>
      <Wrap mt="20px">
        {profile.userData?.skills
          ?.filter((skill) => skill.checked)
          .map((skill, index) => {
            const bgColors = [
              "#feecb0",
              "#b8fec7",
              "#ffc49d",
              "#d0b8fd",
              "#c6fac5",
              "#ffdfa8",
              "#c0c4ff",
            ];
            return { ...skill, bgColor: bgColors[index % bgColors.length] };
          })
          .map((skill) => (
            <WrapItem key={skill._id}>
              <Box
                borderRadius="32px"
                backgroundColor={skill.bgColor}
                pl="12px"
                pr="12px"
                pt="6px"
                pb="6px"
                fontSize={"14.4px"}
              >
                {skill.title}
              </Box>
            </WrapItem>
          ))}
      </Wrap>
    </Box>
  );
};
export default AboutMeSection;
