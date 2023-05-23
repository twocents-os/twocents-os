import onChainCredentialsService from "@src/services/onChainCredentials.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const minted =
    await onChainCredentialsService.fetchOnChainCredentialsMintedByAddress(
      address.toLowerCase()
    );
  const received =
    await onChainCredentialsService.fetchOnChainCredentialsReceivedByAddress(
      address.toLowerCase()
    );
  res.status(200).json({ data: { minted, received } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
