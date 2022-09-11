import { wrapperHandler } from "@src/services/wrapperHandler.mjs";
import profileService from "@src/services/profile";

async function handler(req, res) {
  const { did, address } = req.body;
  await profileService.saveDID(address, did);

  res.status(200).json({ data: { done: "ok" } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
