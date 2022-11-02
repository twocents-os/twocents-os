import { Box, Text, Link, WrapItem, Wrap, chakra } from "@chakra-ui/react";
import React from "react";

const VerifiedCredentials = ({ vcs, ...props }) => {
  return (
    <Box {...props}>
      {(!vcs || vcs.length === 0) && (
        <Box
          backgroundColor={"white"}
          p="10px"
          pt="20px"
          pb="20px"
          borderRadius={"12px"}
          border="1px solid black"
        >
          <Text fontWeight={700}>No Verified Credentials yet</Text>
          <Text mt="20px">
            When you will receive redentials they will be showup here.
          </Text>
        </Box>
      )}
      <Box>
        {vcs &&
          vcs.map((vc) => (
            <Box
              key={vc._id}
              mt="10px"
              backgroundColor={"white"}
              boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)"
              p="10px"
              borderRadius={"6px"}
            >
              <Box>
                <chakra.span fontWeight={"700"}>From: </chakra.span>{" "}
                {vc.issuerEthAddress}
              </Box>
              <Wrap mt="20px">
                {vc.doc.credentialSubject.meta.skills
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
                    return {
                      title: skill,
                      bgColor: bgColors[index % bgColors.length],
                    };
                  })
                  .map((skill, index) => (
                    <WrapItem key={`skill-${index}`}>
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
              <Box mt="12px">
                <chakra.span fontWeight={"700"}>Evidence: </chakra.span>
                <Link
                  isExternal={true}
                  target="_blank"
                  href={vc.doc.credentialSubject.meta.evidenceUrl}
                  color="blue.700"
                >
                  {vc.doc.credentialSubject.meta.evidenceUrl}
                </Link>{" "}
              </Box>
              <Box mt="12px" whiteSpace={"pre-wrap"}>
                <chakra.span fontWeight={"700"}>Description: </chakra.span>
                {vc.doc.credentialSubject.meta.evidenceDescription}
              </Box>
            </Box>
          ))}
      </Box>{" "}
    </Box>
  );
};
export default VerifiedCredentials;
