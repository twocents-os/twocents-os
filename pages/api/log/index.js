import utils from "@src/services/utils.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { level, message, stack, tags, meta } = req.body;
  if (level === "info") {
    utils.logInfo(message, tags, meta);
  }
  if (level === "error") {
    utils.logErrorFront(message, stack, tags, meta);
  }

  res.status(200).json({
    data: {
      done: "ok",
    },
  });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
