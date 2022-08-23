import { Box, Link, Text, Image, Flex, Container } from "@chakra-ui/react";
import { useApi } from "@src/shared/api";
import { usePageState } from "@src/shared/state";
import UIButton from "@src/shared/ui-button";
import { useWallet } from "@src/shared/useWallet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProjectCard from "@src/shared/project/ProjectCard";
import useErrorHandler from "@src/shared/error/useErrorHandler";

export function LandingPage() {
  const errorHandler = useErrorHandler();
  const placeTag = "landing-page";

  const router = useRouter();
  const wallet = useWallet();
  const api = useApi();
  const [projects, setProjects] = useState([]);
  const [state, methods] = usePageState();
  const sections = [
    {
      stepTitle: "Step 1: Have an idea? Tell the world.",
      title: "Post your project.",
      text: "Adventurers wanted. Launch a customisable project page and tell others about your quest.",
      imageUrl: "/landing/step1.png",
      link: "/dashboard",
    },
    {
      stepTitle: "Step 2: Attract Contributors",
      title: "Get Community Help.",
      text: "Show others your unique project page to attract collaborators and gage community interest.",
      imageUrl: "/landing/step2.png",
      link: "/dashboard",
    },
    {
      stepTitle:
        "Step 3: Reward early contributors and show some appreciation to friends. ",
      title: "Give a Proof of Friendship",
      text: "Split the loot of your project with your contributor or reward them with a unique non-transferable soul-bound NFT as a token of your appreciation.",
      imageUrl: "/landing/step3.png",
      link: "/iou/generate",
    },
  ];

  useEffect(() => {
    const fetchProjectsToShowcase = async () => {
      try {
        let response = await api.call(
          "get",
          `/api/projects/fetch-projects-to-showcase`
        );
        setProjects(response.projects);
      } catch (error) {
        errorHandler(error, [placeTag]);
      }
    };
    fetchProjectsToShowcase();
  }, []);

  const handleActionClick = (section) => {
    if (!state.currentAddress) {
      console.log("ask to connect");
      methods.openConnectToWallet(wallet);
      return;
    }
    router.push(section.link);
  };
  const handleStartQuesting = () => {
    if (!state.currentAddress) {
      console.log("ask to connect");
      methods.openConnectToWallet(wallet);
      return;
    }
    router.push("/dashboard");
  };
  return (
    <Container maxW={"7xl"} mt="56px" mb="80px">
      <Flex
        flexDirection={["column", "column", "row"]}
        alignItems={"center"}
        justifyContent={"space-around"}
        minH={"60vh"}
      >
        <Box mt={["34px", "34px", "34px"]}>
          <Text
            fontSize={["38px", "38px", "48px"]}
            fontWeight={700}
            textAlign={["center", "center", "left"]}
          >
            Assemble The Crew To Help Bring Ambitious Projects To Life
          </Text>
          <Text mt="24px" fontSize={"18px"}>
            Share your project, find collaborators and split the spoils.
            <br />
            <br />
            Supercharge your projects with community inputs.
          </Text>
          {/* <UIButton mt="34px" onClick={handleStartQuesting}>
            Start questing together
          </UIButton> */}
        </Box>
        <Image
          src="/landing/apes.png"
          alt="landing image"
          objectFit={"contain"}
          borderRadius="12px"
          border="1px solid black"
          // maxW="600px"
          maxW="100%"
          mt={["34px", "34px", "34px"]}
        />
      </Flex>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mt="86px"
      >
        <Text
          textAlign={"center"}
          fontSize={["38px", "38px", "48px"]}
          fontWeight={700}
        >
          Web3 Squads Wanted
        </Text>
        <Text fontSize={"20px"} mt="12px">
          Post your project, attract community contributors and split rewards
          with them.
        </Text>
        <Box>
          {sections.map((section, i) => {
            return (
              <Box key={`section-${i}`} mt="34px">
                <Box
                  cursor={"pointer"}
                  onClick={() => handleActionClick(section)}
                >
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    flexDirection={["column", "column", "row"]}
                  >
                    <Text maxW={"320px"} fontWeight={700} fontSize="24px">
                      {section.stepTitle}
                    </Text>
                    <Flex
                      ml={["unset", "unset", "100px"]}
                      mt={["34px", "34px", "unset"]}
                      backgroundColor={"white"}
                      boxShadow={"2px 4px 4px rgba(0, 0, 0, 0.25)"}
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      maxW={"600px"}
                      border="solid 1px black"
                      borderRadius={"12px"}
                      p="20px"
                    >
                      <Image
                        src={section.imageUrl}
                        alt="section image"
                        maxW={"320px"}
                        maxH={"100px"}
                      />
                      <Flex flexDirection={"column"} ml="10px">
                        <Text fontWeight={700} mt="12px" fontSize={"24px"}>
                          {section.title}
                        </Text>

                        <Text fontWeight={400} mt="12px" fontSize={"18px"}>
                          {section.text}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Flex>

      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mt="86px"
      >
        <Text
          fontWeight={700}
          textAlign={"center"}
          fontSize={["38px", "38px", "48px"]}
        >
          Explore Projects
        </Text>
        <Text fontSize={"20px"} mt="12px">
          Some Web3 Adventures Out There To Check Out.
        </Text>
        <Box maxW={"600px"} mt="40px">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} mt="10px" />
          ))}
        </Box>
        <UIButton
          mt="12px"
          as="a"
          href="https://discord.com/invite/Sp9qSmhsgJ"
          target="_blank"
          _hover={{ textDecoration: "unset" }}
        >
          See More
        </UIButton>
      </Flex>
      <Flex justifyContent={"center"}>
        <Flex
          boxShadow={"8px 8px 4px rgba(0, 0, 0, 0.25)"}
          border="2px solid #5360D6"
          borderRadius={"12px"}
          backgroundColor={"white"}
          mt="86px"
          p="20px"
          maxW={"800px"}
          flexDirection={["column-reverse", "column-reverse", "row"]}
          alignItems={"center"}
        >
          <Box>
            <Text fontSize={"38px"} fontWeight={700}>
              Let&apos;s Build Together
            </Text>
            <Text mt="12px">
              We want to build a space that can help you, your project and
              community. We are sharing our Web3 learnings as we go. Chat with
              us, other project creators and community pioneers on our Discord.
            </Text>
            <UIButton
              mt="12px"
              as="a"
              href="https://discord.com/invite/Sp9qSmhsgJ"
              target="_blank"
              _hover={{ textDecoration: "unset" }}
            >
              Join Our Discord
            </UIButton>
          </Box>
          <Image
            ml="10px"
            src="/landing/discord.png"
            alt="landing image"
            maxW={"320px"}
            mt={["34px", "34px", "unset"]}
          />
        </Flex>
      </Flex>
    </Container>
  );
}

export default LandingPage;
