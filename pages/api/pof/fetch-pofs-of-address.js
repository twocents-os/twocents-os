import pofService from "@src/services/pof.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const minted = await pofService.fetchPOFsMintedByAddress(
    address.toLowerCase()
  );
  const received = await pofService.fetchPOFsReceivedByAddress(
    address.toLowerCase()
  );
  res.status(200).json({ data: { minted, received } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
