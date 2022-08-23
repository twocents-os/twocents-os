import { Box, Flex, Text, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePageState } from "@src/shared/state";

const ManageYourProject = ({ profile }) => {
  const [state] = usePageState();
  const [canChange, setCanChange] = useState(false);
  const [editLink, setEditLink] = useState("");

  useEffect(() => {
    if (!profile || !profile.address || !state.currentAddress) {
      return;
    }
    setCanChange(
      profile.address.toLowerCase() === state.currentAddress.toLowerCase()
    );
  }, [profile, state.currentAddress]);

  useEffect(() => {
    setEditLink(`${window.location.href.split("?")[0]}/edit`);
  }, []);

  return (
    <Box>
      {canChange && (
        <Flex mt="20px">
          <Text color={"#536B83"} fontWeight="700">
            THIS IS YOUR PROJECT ---{" "}
          </Text>
          <Link href={editLink} isExternal={false}>
            <Text color={"#1A2EF3"} cursor="pointer" ml="10px" fontWeight="700">
              {" "}
              Manage Project
            </Text>
          </Link>
        </Flex>
      )}
    </Box>
  );
};

export default ManageYourProject;
