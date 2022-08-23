import iouService from "@src/services/iou";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const minted = await iouService.fetchIOUsMintedByAddress(
    address.toLowerCase()
  );
  const received = await iouService.fetchIOUsReceivedByAddress(
    address.toLowerCase()
  );
  res.status(200).json({ data: { minted, received } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
