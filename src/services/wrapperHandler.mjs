import utils from "@src/services/utils.mjs";
import path from "path";
const scriptName = path.basename(__filename);

export const wrapperHandler = async (method, req, res, handler) => {
  if (req.method === method) {
    try {
      await handler(req, res);
    } catch (error) {
      utils.logError(error, ["service-api", scriptName], {
        requestQuery: req.query,
        requestBody: req.body,
        url: req.url,
      });
      res
        .status(500)
        .json({ error: "API Error", internalMessage: error.message });
    }
  } else {
    utils.logError(new Error("Method Not Allowed"), ["service-api"], {
      requestQuery: req.query,
      requestBody: req.body,
      requestUrl: req.url,
      requestMethod: req.method,
    });
    res.setHeader("Allow", method);
    res.status(405).end("Method Not Allowed");
  }
};
