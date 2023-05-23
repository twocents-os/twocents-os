import onChainCredentialsService from "@src/services/onChainCredentials.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const savedCredential =
    await onChainCredentialsService.submitOnChainCredential(req.body);
  res.status(200).json({ data: { credential: savedCredential } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
