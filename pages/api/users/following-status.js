import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { from, to } = req.query;

  const followExisting = await repository.findOneDoc(COLLECTIONS.FOLLOW, {
    fromAddress: from,
    toAddress: to,
  });

  res.status(200).json({ data: { isFollowing: !!followExisting } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
