import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { address, session } = req.body;
  const savedSession = await repository.saveDoc(COLLECTIONS.DID_SESSIONS, {
    session,
    address: address.toLowerCase(),
  });

  res.status(200).json({ data: { session: savedSession } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
