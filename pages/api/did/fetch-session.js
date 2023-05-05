import { wrapperHandler } from "@src/services/wrapperHandler.mjs";
import repository, { COLLECTIONS } from "@src/services/repository.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const sessionRecord = await repository.findOneDoc(COLLECTIONS.DID_SESSIONS, {
    address: address.toLowerCase(),
  });

  res.status(200).json({ data: { session: sessionRecord?.session || null } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
