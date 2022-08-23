import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const savedProject = await repository.saveDoc(COLLECTIONS.PROJECTS, req.body);
  res.status(200).json({ data: { project: savedProject } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
