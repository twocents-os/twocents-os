import profileService from "@src/services/profile";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const ens = await profileService.resolveEnsAaddress(address);
  res.status(200).json({ data: { ens } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
