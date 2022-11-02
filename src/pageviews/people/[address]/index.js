import { Box, Flex, Container, useMediaQuery, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useApi } from "@src/shared/api";
import ProfileAvatarSection from "@src/pageviews/people/[address]/ProfileAvatarSection";
import ProfileActionSection from "@src/pageviews/people/[address]/ProfileActionSection";
import ProfileInfoSection from "@src/pageviews/people/[address]/ProfileInfoSection";
import AccordionSection from "@src/pageviews/people/[address]/ProfileTabSection/AccordionSection";
import ActionsList from "@src/pageviews/people/[address]/ProfileTabSection/ActionsList";
import POAPList from "@src/pageviews/people/[address]/ProfileTabSection/POAPList";
import ProjectList from "@src/pageviews/people/[address]/ProfileTabSection/ProjectList";
import IOUList from "@src/pageviews/people/[address]/ProfileTabSection/IOUList";
import POFList from "@src/pageviews/people/[address]/ProfileTabSection/POFList";
import ProfileSelectedTabDesktop from "@src/pageviews/people/[address]/ProfileTabSection/ProfileSelectedTabDesktop";
import {
  faAddressBook,
  faChartLine,
  faHistory,
  faLink,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import {
  faRectangleList,
  faHandshake,
} from "@fortawesome/free-regular-svg-icons";
import AboutMeSection from "@src/pageviews/people/[address]/AboutMeSection";
import LinksSection from "@src/pageviews/people/[address]/LinksSection";
import ProjectListWrapper from "@src/pageviews/people/[address]/ProjectListWrapper";
import CoverSection from "@src/pageviews/people/[address]/CoverSection";
import SendPOFSection from "@src/pageviews/people/[address]/SendPOFSection";
import useErrorHandler from "@src/shared/error/useErrorHandler";
import ProfileFollowButton from "@src/shared/follow/ProfileFollowButton";
import Router, { useRouter } from "next/router";

import VerifiedCredentials from "@src/pageviews/people/[address]/ProfileTabSection/VerifiedCredentials";

const ProfilePageView = ({ profile: _profile, initialAddress }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "profile-pageview";
  const profileInitalState = {
    followDataFromSnapshot: { data: { follows: [] } },
    projects: [],
    address: "",
    snapshotData: { data: { votes: [] } },
    poapData: [],
  };
  const [isDesktop] = useMediaQuery("(min-width: 768px)");

  const [actions, setActions] = useState([]);
  const [profile, setProfile] = useState({ ...profileInitalState });
  const [poaps, setPoaps] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const [mintedIOUs, setMintedIOUs] = useState([]);
  const [receivedIOUs, setReceivedIOUs] = useState([]);
  const [mintedPOFs, setPOFsMinted] = useState([]);
  const [receivedPOFs, setPOFsReceived] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(null);
  const api = useApi();
  const router = useRouter();

  const tabs = [
    {
      id: 1,
      queryId: "activity",
      title: "Activity",
      component: ActionsList,
      props: {
        actions,
      },
      isDefault: true,
      dep: actions,
      icon: faChartLine,
      count: actions?.length,
    },
    {
      id: 2,
      queryId: "projects",
      title: "Projects",
      component: ProjectList,
      props: {
        projects: profile.projects,
      },
      tabItemProps: {
        display: ["none", "none", "block"],
      },
      icon: faRectangleList,
      count: profile?.projects?.length,
    },
    {
      id: 3,
      queryId: "poap",
      title: "POAP",
      component: POAPList,
      props: {
        poaps,
      },
      iconPath: "/poap/poap.png",
      count: poaps?.length,
    },
    {
      id: 4,
      queryId: "iou",
      title: "I Owe You's",
      component: IOUList,
      props: {
        received: receivedIOUs,
        minted: mintedIOUs,
      },
      icon: faAddressBook,
      count: receivedIOUs?.length + mintedIOUs?.length,
    },
    {
      id: 5,
      queryId: "proofs",
      title: "Proof of Friendships",
      component: POFList,
      props: {
        received: receivedPOFs,
        minted: mintedPOFs,
      },
      icon: faHandshake,
      count: receivedPOFs?.length + mintedPOFs?.length,
    },
    {
      id: 6,
      queryId: "links",
      title: "Personal Links",
      component: LinksSection,
      props: {
        links: profile?.userData?.links,
      },
      tabItemProps: {
        display: ["none", "none", "block"],
      },
      icon: faLink,
      count: profile?.userData?.links?.length,
    },
    {
      id: 7,
      queryId: "vcs",
      title: "Verified Credentials",
      component: VerifiedCredentials,
      props: {
        vcs: profile?.vcs,
      },
      tabItemProps: {
        display: ["block", "block", "block"],
      },
      icon: faPaperclip,
      count: profile?.vcs?.length,
    },
  ];

  const defaultTab = tabs.find((tab) => tab.isDefault);
  useEffect(() => {
    if (!defaultTab.dep) {
      return;
    }
    if (isDesktop && !router.query.section) {
      const tabIndex = tabs.findIndex((t) => t.id === defaultTab.id);
      setSelectedTabIndex(tabIndex);
    }
  }, [defaultTab.dep, isDesktop]);

  useEffect(() => {
    const snapshotArray = profile?.snapshotData?.data?.votes.map((vote) => ({
      data: vote,
      id: vote.id,
      date: new Date(vote.created * 1000),
      type: "snapshot",
    }));

    const poapArray = profile?.poapData?.map((poap) => {
      const startDate = poap.event.start_date;
      return {
        data: poap,
        id: poap.tokenId,
        date: startDate ? new Date(startDate) : new Date(),
        type: "poap",
      };
    });
    setPoaps(poapArray);
    setSnapshots(snapshotArray);
    setActions(snapshotArray.concat(poapArray).sort((a, b) => b.date - a.date));
  }, [profile.poapData, profile.snapshotData]);

  useEffect(() => {
    if (!initialAddress) {
      return;
    }
    const fetchData = async () => {
      try {
        //initial state
        let updatedProfile = {
          ...profileInitalState,
        };
        //resolve addres - if eth
        let response = await api.call(
          "get",
          `/api/profiles/fetch-resolved-address?address=${initialAddress}`
        );
        updatedProfile.address = response.resolvedAddress.toLowerCase();
        setProfile({ ...updatedProfile });

        //fetch pofs
        response = await api.call(
          "get",
          `/api/pof/fetch-pofs-of-address?address=${updatedProfile.address}`
        );
        setPOFsMinted(response.minted);
        setPOFsReceived(response.received);

        //get iou
        response = await api.call(
          "get",
          `/api/iou/fetch-ious-of-address?address=${updatedProfile.address}`
        );
        setMintedIOUs(response.minted);
        setReceivedIOUs(response.received);

        //get main user data
        response = await api.call(
          "get",
          `/api/profiles/fetch-user-data?address=${updatedProfile.address}`
        );
        updatedProfile.userData = response.userData;
        setProfile({ ...updatedProfile });

        //projects
        response = await api.call(
          "get",
          `/api/projects/fetch-projects-of-address?address=${updatedProfile.address}`
        );
        updatedProfile.projects = response.projects;
        setProfile({ ...updatedProfile });

        //verified credentials - vcs
        response = await api.call(
          "get",
          `/api/did/fetch-vcs-of-address?address=${updatedProfile.address}`
        );
        updatedProfile.vcs = response.vcs;
        setProfile({ ...updatedProfile });

        //poap data
        response = await api.call(
          "get",
          `https://api.poap.tech/actions/scan/${updatedProfile.address}`,
          null,
          true
        );
        updatedProfile.poapData = response;
        setProfile({ ...updatedProfile });

        // snapshot votes
        const voteQuery = (address) => `
                query {
                votes (
                    first: 1000
                    where: {
                    
                    voter:"${address}"
                    }
                ) {
                    id
                    voter
                    created
                    choice
                    proposal{
                    id
                    title
                    body
                    link
                    
                    }
                    space {
                    id
                    }
                }
                }
     `;

        response = await api.call(
          "post",
          `https://hub.snapshot.org/graphql/`,
          { query: voteQuery(updatedProfile.address) },
          true
        );

        updatedProfile.snapshotData = response;
        setProfile({ ...updatedProfile });

        //get daos that user is following
        const daosQuery = (address) => `
              query Follows {
                follows(where: {follower: "${address}"}) {
                  id
                  follower
                  space {
                    id,
                    name,
                    avatar
                    followersCount
                  }
                  created
                }
              }
     `;

        response = await api.call(
          "post",
          `https://hub.snapshot.org/graphql/`,
          { query: daosQuery(updatedProfile.address) },
          true
        );
        updatedProfile.followDataFromSnapshot = response;
        setProfile({ ...updatedProfile });

        //resolve ens
        response = await api.call(
          "get",
          `/api/profiles/fetch-ens-address?address=${initialAddress}`
        );
        updatedProfile.ens = response.ens;
        setProfile({ ...updatedProfile });
      } catch (error) {
        errorHandler(error, [placeTag]);
      }
    };
    fetchData();
  }, [initialAddress]);

  const handleAccordionIndexChange = async (selectedTabId) => {
    const tabIndex = tabs.findIndex((t) => t.id === selectedTabId);
    Router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, section: tabs[tabIndex].queryId },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    const querySectionId = router.query.section;

    if (!querySectionId) {
      return;
    }
    const tabIndex = tabs.findIndex((t) => t.queryId === querySectionId);
    if (tabIndex === -1) {
      return;
    }
    setSelectedTabIndex(tabIndex);
  }, [router?.query?.section]);

  return (
    <Box mb="100px">
      <CoverSection profile={profile} />
      <Container maxW={"7xl"} p={"10px"}>
        <Flex mt={["-70px", "-70px", "-90px"]} alignItems="center">
          <ProfileAvatarSection
            profile={profile}
            poaps={poaps}
            snapshots={snapshots}
          />
          <ProfileFollowButton address={profile.address} />
        </Flex>
      </Container>

      <Container maxW={"7xl"} overflow={"hidden"}>
        <Flex
          alignItems={["center", "center", "start"]}
          justifyContent={"center"}
          flexDirection={["column", "column", "row"]}
        >
          <Flex
            minW={"320px"}
            maxW={["100%", "100%", "320px"]}
            w={["100%", "100%", "320px"]}
            alignSelf={"start"}
            alignItems={"start"}
            flexDirection={"column"}
            ml={["unset", "unset", "20px"]}
          >
            <ProfileInfoSection profile={profile} />
            <ProfileActionSection profile={profile} mt="12px" />
            <SendPOFSection
              profile={profile}
              display={["none", "none", "block"]}
              mt="24px"
            />
            <AboutMeSection
              mt="24px"
              profile={profile}
              display={["block", "block", "none"]}
            />
            <LinksSection
              mt="24px"
              display={["block", "block", "none"]}
              links={profile?.userData?.links}
            />
            <AccordionSection
              mt="24px"
              onChange={handleAccordionIndexChange}
              accordionItems={tabs}
              selectedTabIndex={selectedTabIndex}
              // defaultIndex={0}
            />
            <ProjectListWrapper
              mt="24px"
              projects={profile.projects}
              display={["block", "block", "none"]}
            />
          </Flex>
          <Flex flexGrow={"1"} maxW={"100%"} flexDirection="column" p="12px">
            <AboutMeSection
              profile={profile}
              display={["none", "none", "block"]}
              ml="60px"
            />

            <ProfileSelectedTabDesktop
              selectedTab={tabs[selectedTabIndex]}
              mt="20px"
              ml="60px"
            />
          </Flex>
        </Flex>
      </Container>
      <Center>
        <SendPOFSection
          profile={profile}
          position="fixed"
          bottom="20px"
          display={["block", "block", "none"]}
        />
      </Center>
    </Box>
  );
};

export default ProfilePageView;
