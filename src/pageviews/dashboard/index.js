import {
  Box,
  Button,
  Container,
  useToast,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Image,
  Flex,
  Link,
  chakra,
} from "@chakra-ui/react";
import { useApi } from "@src/shared/api";
import { usePageState } from "@src/shared/state";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import IOUCard from "@src/shared/iou/IOUCard";
import UIButton from "@src/shared/ui-button";
import ProjectCard from "@src/shared/project/ProjectCard";
import POFCard from "@src/shared/pof/POFCard";
import useErrorHandler from "@src/shared/error/useErrorHandler";

function DashboardPageView() {
  const errorHandler = useErrorHandler();
  const placeTag = "dashboard-pageview";
  const api = useApi();
  const toast = useToast();
  const router = useRouter();
  const [state] = usePageState();

  const [projects, setProjects] = useState([]);
  const [minted, setMinted] = useState([]);
  const [received, setReceived] = useState([]);

  const handleCreateNewProject = async () => {
    router.push("/project/create");
  };
  const handleCreatePOF = async () => {
    router.push("/pof/generate");
  };
  useEffect(() => {
    if (!state.currentAddress) {
      return;
    }
    const fetchData = async () => {
      try {
        let response = await api.call(
          "get",
          `/api/projects/fetch-projects-of-address?address=${state.currentAddress}`
        );
        setProjects(response.projects);
        response = await api.call(
          "get",
          `/api/pof/fetch-pofs-of-address?address=${state.currentAddress}`
        );
        setMinted(response.minted);
        setReceived(response.received);
      } catch (error) {
        errorHandler(error, [placeTag]);
      }
    };
    fetchData();
  }, [state.currentAddress]);
  return (
    <Container mb="240px">
      <Text fontSize={"20px"} fontWeight={700} mt="40px">
        GM,{" "}
        <chakra.span color={"#1A2EF3"}>
          {" "}
          {state.user.onboardingData &&
            state.user.onboardingData?.init?.userName}
        </chakra.span>
      </Text>
      <Divider mt="22px" />
      <Text
        mt="12px"
        backgroundColor={"#E2EFE6"}
        p="20px"
        fontSize={"14px"}
        borderRadius="8px"
      >
        👋 This is your dashboard. Setup a project page to tell the world about
        any project you are working on and build a community of collaborators.
        Send a &apos;Proof of Friendship&apos; to people who you have worked
        with or have helped you out with any project.
      </Text>
      <Flex
        minH="400px"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"start"}
        borderRadius={"6px"}
        p="10px"
        mt="45px"
      >
        <Flex justifyContent={"space-between"} w="100%" mb="40px">
          <Text fontWeight={700} fontSize="20px">
            Projects
          </Text>
          <UIButton onClick={handleCreateNewProject}>+ Create</UIButton>
        </Flex>
        <Box>
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} mt="10px" />
          ))}
        </Box>
        {(!projects || projects.length === 0) && (
          <Flex
            justifyContent={"center"}
            alignItems="center"
            flexDirection={"column"}
            backgroundColor={"#F1F4FB"}
            borderRadius={"12px"}
            boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25)"
            p="20px"
          >
            <Text fontSize={"18px"} fontWeight={700}>
              No Projects Yet
            </Text>
            <Image
              src="/project/noprojects1.png"
              maxW={"68px"}
              maxH={"88px"}
              w="68px"
              h="88px"
              mt="18px"
              fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
              alt="no-projects-yet"
            />
            <Text fontSize={"14.5px"} mt="18px">
              You haven&apos;t showcased any projects yet. Create a project page
              to highlight what you are working on, what communities you have
              been a part of, find collaborators and reward contributors.
            </Text>
          </Flex>
        )}
      </Flex>
      <Divider mt="40px" mb="40px"></Divider>

      <Box mt="20px">
        <Flex justifyContent={"space-between"} w="100%" mb="40px" p="10px">
          <Text fontWeight={700} fontSize="20px">
            Proof of Friendship
          </Text>
          <UIButton onClick={handleCreatePOF}>+ Create</UIButton>
        </Flex>
        <Tabs id="2" maxW={"100%"}>
          <TabList border="unset">
            <Tab
              fontSize={["14px", "14px", "14px", "14px"]}
              fontWeight={600}
              boxShadow="unset"
              _selected={{
                boxShadow: "unset",
                borderBottom: "3px solid #EC6D68",
              }}
            >
              POFs Given
            </Tab>
            <Tab
              fontSize={["14px", "14px", "14px", "14px"]}
              fontWeight={600}
              boxShadow="unset"
              _selected={{
                boxShadow: "unset",
                borderBottom: "3px solid #EC6D68",
              }}
            >
              POFs Received
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              {minted?.map((pof) => (
                <POFCard key={`pof-card-${pof._id}`} pof={pof} mt={"10px"} />
              ))}
              {(!minted || minted.length === 0) && (
                <Flex
                  justifyContent={"center"}
                  alignItems="center"
                  flexDirection={"column"}
                  backgroundColor={"#F1F4FB"}
                  borderRadius={"12px"}
                  boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25)"
                  p="20px"
                  m="5px"
                >
                  <Text fontSize={"18px"} fontWeight={700}>
                    No Friendships Yet
                  </Text>
                  <Image
                    src="/pof/gift.png"
                    maxW={"68px"}
                    maxH={"88px"}
                    w="68px"
                    h="88px"
                    mt="18px"
                    fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
                    alt="no-projects-yet"
                  />
                  <Text fontSize={"14.5px"}>
                    You haven&apos;t sent any Proof of Friendships yet. Send a
                    friend, someone you have worked with or someone who has
                    helped you out on a project, a Proof of Friendship to enable
                    them to showcase a non-transferable NFT of your appreciation
                    for them.
                  </Text>
                </Flex>
              )}
            </TabPanel>
            <TabPanel>
              {received?.map((pof) => (
                <POFCard key={`pof-card-${pof._id}`} pof={pof} mt={"10px"} />
              ))}
              {(!received || received.length === 0) && (
                <Flex
                  justifyContent={"center"}
                  alignItems="center"
                  flexDirection={"column"}
                  backgroundColor={"#F1F4FB"}
                  borderRadius={"12px"}
                  boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25)"
                  p="20px"
                  m="5px"
                >
                  <Text fontSize={"18px"} fontWeight={700}>
                    No Friendships Yet
                  </Text>
                  <Image
                    src="/pof/gift.png"
                    maxW={"68px"}
                    maxH={"88px"}
                    w="68px"
                    h="88px"
                    mt="18px"
                    fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
                    alt="no-projects-yet"
                  />
                  <Text fontSize={"14.5px"}>
                    You haven&apos;t received any Proof of Friendships yet. Send
                    a friend, someone you have worked with or someone who has
                    helped you out on a project, a Proof of Friendship to enable
                    them to showcase a non-transferable NFT of your appreciation
                    for them.
                  </Text>
                </Flex>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default DashboardPageView;
