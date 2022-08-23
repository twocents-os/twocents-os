import profileService from "@src/services/profile";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const resolvedAddress = await profileService.resolveAddress(
    address.toLowerCase()
  );
  res.status(200).json({ data: { resolvedAddress } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
