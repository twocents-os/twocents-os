import pofService from "@src/services/pof.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { transaction } = req.query;
  const pof = await pofService.fetchPOFByTransactionHash(transaction);
  res.status(200).json({ data: { pof } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
