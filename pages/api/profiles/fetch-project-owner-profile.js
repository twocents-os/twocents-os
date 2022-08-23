import profileService from "@src/services/profile";
import projectService from "@src/services/project.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { projectId } = req.query;
  const projectOwnerAddress =
    await projectService.fetchProjectOwnerAddressByProjectId(projectId);
  const profile = await profileService.fetchProfileInfoForProjectPage(
    projectOwnerAddress
  );
  res.status(200).json({ data: { profile } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
