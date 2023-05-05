import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const savedVerifiedCredential = await repository.saveDoc(
    COLLECTIONS.CREDENTIALS,
    req.body
  );

  res
    .status(200)
    .json({ data: { verifiedCredential: savedVerifiedCredential } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
