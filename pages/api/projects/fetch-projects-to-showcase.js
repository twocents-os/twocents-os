import projectService from "@src/services/project.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const projects = await projectService.fetchProjectsByIds([
    process.env.PROJECT_SHOWCASE_ID_1,
    process.env.PROJECT_SHOWCASE_ID_2,
    process.env.PROJECT_SHOWCASE_ID_3,
  ]);
  res.status(200).json({ data: { projects: projects.reverse() } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
