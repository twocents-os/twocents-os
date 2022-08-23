import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { from, to } = req.body;
  await repository.deleteOneDoc(COLLECTIONS.FOLLOW, {
    fromAddress: from.toLowerCase(),
    toAddress: to.toLowerCase(),
  });

  res.status(200).json({ data: { done: "ok" } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
