import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const savedIOU = await repository.saveDoc(COLLECTIONS.IOU, req.body);
  res.status(200).json({ data: { iou: savedIOU } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
