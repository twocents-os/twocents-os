import { wrapperHandler } from "@src/services/wrapperHandler.mjs";
import { CeramicClient } from "@ceramicnetwork/http-client";

async function handler(req, res) {
  const { s: streamId } = req.query;
  const ceramic = new CeramicClient("https://ceramic.twocents.so");
  const data = await ceramic.loadStream(streamId);
  //note -> for checking we need to extract conroller DID from metadata
  // - get list of wallet addresses under this DID
  // - check if doc issuer eth address equals one of addresses from list
  console.log(data.metadata);

  res.status(200).json({ data: { doc: data.content } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
