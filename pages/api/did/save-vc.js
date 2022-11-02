import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { doc, docId, credentialId, issuerEthAddress, targetEthAddress } =
    req.body;
  const savedVerifiedCredential = await repository.saveDoc(COLLECTIONS.VC, {
    doc,
    docId,
    credentialId,
    issuerEthAddress: issuerEthAddress.toLowerCase(),
    targetEthAddress: targetEthAddress.toLowerCase(),
  });

  res
    .status(200)
    .json({ data: { verifiedCredential: savedVerifiedCredential } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
