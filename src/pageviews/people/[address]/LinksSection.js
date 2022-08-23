import { Box, Link, Stack, Text, Flex } from "@chakra-ui/react";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const LinksSection = ({ links, ...props }) => {
  if (!links) {
    return null;
  }
  return (
    <Box w="100%" {...props}>
      <Flex
        display={["flex", "flex", "none"]}
        justifyContent={"start"}
        alignItems="center"
        mb="24px"
      >
        <FontAwesomeIcon icon={faLink} color="#0057B7" size="lg" />
        <Text ml="10px" fontWeight={700} fontSize="16px" color={"#0057B7"}>
          Things Of Mine To Check Out
        </Text>
      </Flex>
      <Stack mt="24px">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            isExternal={true}
            target={"_blank"}
            p="10px"
            backgroundColor="#FFF8B5"
            borderRadius={"12px"}
            border="2px black solid "
            fontWeight={700}
            textAlign={"center"}
            _hover={{ textDecoration: "unset" }}
          >
            {link.title}
          </Link>
        ))}
      </Stack>
    </Box>
  );
};
export default LinksSection;
