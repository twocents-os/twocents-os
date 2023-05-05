import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const ceramicProfile = await repository.saveDoc(
    COLLECTIONS.CERAMIC_PROFILE,
    req.body
  );

  res.status(200).json({ data: { ceramicProfile } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
