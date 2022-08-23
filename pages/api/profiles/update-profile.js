import profileService from "@src/services/profile";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const savedProfile = await profileService.updateProfile(req.body);
  res.status(200).json({ data: { profile: savedProfile } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
