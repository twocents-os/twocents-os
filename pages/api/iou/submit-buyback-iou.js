import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { iouId, transactionHash } = req.body;
  await repository.saveDoc(COLLECTIONS.IOU, {
    _id: iouId,
    buyBackTransactionHash: transactionHash,
    isBuyBackMade: true,
    buyBackDate: new Date(),
  });
  res.status(200).json({ data: { done: "ok" } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
