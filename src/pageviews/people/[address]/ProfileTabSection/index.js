import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
import ActionsList from "@src/pageviews/people/[address]/ProfileTabSection/ActionsList";
import ProjectList from "@src/pageviews/people/[address]/ProfileTabSection/ProjectList";
import IOUList from "@src/pageviews/people/[address]/ProfileTabSection/IOUList";
import POFList from "@src/pageviews/people/[address]/ProfileTabSection/POFList";
import POAPList from "@src/pageviews/people/[address]/ProfileTabSection/POAPList";

const ProfileTabsSection = ({
  actions,
  profile,
  poaps,
  received,
  minted,
  receivedPOFs,
  mintedPOFs,
  ...props
}) => {
  return (
    <Tabs id="2" maxW={"100%"} w="100%" {...props}>
      <TabList border="unset">
        <Tab
          fontSize={["14px", "18px", "24px", "24px"]}
          fontWeight={600}
          boxShadow="unset"
          _selected={{
            boxShadow: "unset",
            borderBottom: "3px solid #EC6D68",
          }}
        >
          Activity
        </Tab>
        <Tab
          fontSize={["14px", "18px", "24px", "24px"]}
          fontWeight={600}
          boxShadow="unset"
          _selected={{
            boxShadow: "unset",
            borderBottom: "3px solid #EC6D68",
          }}
        >
          Projects
        </Tab>
        <Tab
          fontSize={["14px", "18px", "24px", "24px"]}
          fontWeight={600}
          boxShadow="unset"
          _selected={{
            boxShadow: "unset",
            borderBottom: "3px solid #EC6D68",
          }}
        >
          POAP
        </Tab>
        <Tab
          fontSize={["14px", "18px", "24px", "24px"]}
          fontWeight={600}
          boxShadow="unset"
          _selected={{
            boxShadow: "unset",
            borderBottom: "3px solid #EC6D68",
          }}
        >
          IOUs
        </Tab>
        <Tab
          fontSize={["14px", "18px", "24px", "24px"]}
          fontWeight={600}
          boxShadow="unset"
          _selected={{
            boxShadow: "unset",
            borderBottom: "3px solid #EC6D68",
          }}
        >
          POFs
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ActionsList actions={actions} />
        </TabPanel>
        <TabPanel>
          <ProjectList projects={profile.projects} />
        </TabPanel>
        <TabPanel>
          <POAPList poaps={poaps} />
        </TabPanel>
        <TabPanel>
          <IOUList received={received} minted={minted} />
        </TabPanel>
        <TabPanel>
          <POFList received={receivedPOFs} minted={mintedPOFs} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabsSection;
