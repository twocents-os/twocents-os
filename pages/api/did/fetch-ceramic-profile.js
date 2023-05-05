import { wrapperHandler } from "@src/services/wrapperHandler.mjs";
import repository, { COLLECTIONS } from "@src/services/repository.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const ceramicProfile = await repository.findOneDoc(
    COLLECTIONS.CERAMIC_PROFILE,
    {
      address: address.toLowerCase(),
    }
  );

  res.status(200).json({ data: { ceramicProfile: ceramicProfile || null } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
