import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Container,
  Text,
  Input,
  IconButton,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectEditor } from "@src/pageviews/project/ProjectEditor";
import frontUtils from "@src/shared/front-utils";
import POFGenerator from "@src/shared/pof/POFGenerator";

const ProjectEditPageView = ({ project }) => {
  const toast = useToast();
  const tabButtonStyleProps = {
    _selected: {
      color: "#1A2EF3",
      fontWeight: 700,
      borderBottom: "3px solid #1A2EF3",
    },
    fontWeight: 700,
    color: "#536B83",
    _focus: { outline: "unset" },
  };
  const projectLink = `${window.location.origin}/project/${project._id}`;
  const handleProjectLinkCopy = () => {
    frontUtils.CopyMe(projectLink);
    toast({
      title: "Copied in clipboard",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };
  return (
    <Box>
      <Container maxW={"1100px"} mt="56px">
        <Text color={"#041439"} fontSize="24px" fontWeight={700}>
          {project.name}
        </Text>
        <Text p="20px" backgroundColor={"#E2EFE6"} borderRadius="8px" mt="24px">
          🙌 You just created a project page! Share your page with others to
          help them discover it. Edit the page on the &apos;Details&apos; tab or
          reward your project&apos;s contributors in the &apos;Reward
          Contributors&apos; tab.
        </Text>
        <Box mt="36px">
          <Text color={"#536B83"} fontWeight="700">
            Share your project with others:
          </Text>
          <Flex alignItems={"center"} mt="10px">
            <Input
              readOnly={true}
              value={projectLink}
              backgroundColor={"white"}
            />
            <IconButton onClick={handleProjectLinkCopy} ml="5px">
              <FontAwesomeIcon icon={faCopy} color="grey" />
            </IconButton>
          </Flex>
        </Box>
        <Tabs variant="enclosed" mt="36px">
          <TabList>
            <Tab {...tabButtonStyleProps}>🖋 Details</Tab>
            <Tab {...tabButtonStyleProps}>🤝 Reward Contributors</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProjectEditor
                project={project}
                redirectOnEditAfterSubmit={false}
                submitButtonTittle="💾 Save Changes"
              />
            </TabPanel>
            <TabPanel>
              <POFGenerator />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};
export default ProjectEditPageView;
