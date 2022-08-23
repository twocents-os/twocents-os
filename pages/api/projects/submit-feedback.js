import projectService from "@src/services/project.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const savedFeedback = await projectService.submitFeedback(req.body);

  res.status(200).json({
    data: {
      feedback: savedFeedback,
    },
  });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
