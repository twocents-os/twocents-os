import { wrapperHandler } from "@src/services/wrapperHandler.mjs";
import repository, { COLLECTIONS } from "@src/services/repository.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const vcs = await repository.findManyDoc(COLLECTIONS.VC, {
    targetEthAddress: address.toLowerCase(),
  });

  res.status(200).json({ data: { vcs } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
