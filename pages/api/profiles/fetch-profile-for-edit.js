import profileService from "@src/services/profile";
import utils from "@src/services/utils.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const profile = await profileService.fetchProfileInfoForEdit(
    address.toLowerCase()
  );
  res.status(200).json({ data: { profile } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
