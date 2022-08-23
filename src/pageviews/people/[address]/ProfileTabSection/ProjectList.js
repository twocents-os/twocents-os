import { Box, Text, Link } from "@chakra-ui/react";
import React from "react";
import { usePageState } from "@src/shared/state";
import ProjectCard from "@src/shared/project/ProjectCard";
import { useRouter } from "next/router";

const ProjectList = ({ projects, ...props }) => {
  const router = useRouter();
  const [, methods] = usePageState();
  const handleDashboardClick = () => {
    if (!state.currentAddress) {
      methods.openConnectToWallet(wallet);
      return;
    }
    router.push("/dashboard");
  };
  return (
    <Box {...props}>
      {(!projects || projects.length === 0) && (
        <Box
          backgroundColor={"white"}
          p="10px"
          pt="20px"
          pb="20px"
          borderRadius={"12px"}
          border="1px solid black"
        >
          <Text fontWeight={700}>No projects yet</Text>
          <Text mt="20px">
            When you will create projects they will be showup here. You can
            create projects from{" "}
            <Link
              onClick={handleDashboardClick}
              cursor={"pointer"}
              textDecor={"underline"}
            >
              Dashboard
            </Link>
          </Text>
        </Box>
      )}
      <Box>
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} mt="10px" />
        ))}
      </Box>{" "}
    </Box>
  );
};
export default ProjectList;
