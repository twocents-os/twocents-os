import projectService from "@src/services/project.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const projects = await projectService.fetchProjectsByAddress(
    address.toLowerCase()
  );
  res.status(200).json({ data: { projects } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
