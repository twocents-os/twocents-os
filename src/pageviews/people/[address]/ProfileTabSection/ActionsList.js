import { Box, Text } from "@chakra-ui/react";
import React from "react";
import ActivityPoapCard from "@src/pageviews/people/[address]/ActivityPOAPCard";
import ActivitySnaptshotCard from "@src/pageviews/people/[address]/ActivitySnaptshotCard";

const ActionsList = ({ actions, ...props }) => {
  return (
    <Box {...props}>
      {(!actions || actions.length === 0) && (
        <Box
          backgroundColor={"white"}
          p="10px"
          pt="20px"
          pb="20px"
          borderRadius={"12px"}
          border="1px solid black"
        >
          <Text fontWeight={700}>No activities tracked yet</Text>
          <Text mt="20px">
            When you start voting on Snapshot or minting POAPs they will be
            showup here.
          </Text>
        </Box>
      )}
      {actions.map((action) => (
        <React.Fragment key={action.id}>
          {action.type === "snapshot" && (
            <ActivitySnaptshotCard data={action.data} date={action.date} />
          )}
          {action.type === "poap" && (
            <ActivityPoapCard data={action.data} date={action.date} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ActionsList;
