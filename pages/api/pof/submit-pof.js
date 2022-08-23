import pofService from "@src/services/pof.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const savedPOF = await pofService.submitPOF(req.body);
  res.status(200).json({ data: { pof: savedPOF } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
