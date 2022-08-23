import { Box } from "@chakra-ui/react";
import { ProjectEditor } from "../ProjectEditor";

const ProjectCreatePageView = () => {
  return (
    <Box>
      <ProjectEditor
        redirectOnEditAfterSubmit={true}
        submitButtonTittle="💾 Create Project"
      />
    </Box>
  );
};
export default ProjectCreatePageView;
