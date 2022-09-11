import { wrapperHandler } from "@src/services/wrapperHandler.mjs";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { DID } from "dids";
import { getResolver as getKeyResolver } from "key-did-resolver";
import { getResolver as get3IDResolver } from "@ceramicnetwork/3id-did-resolver";

async function handler(req, res) {
  const { d: didString } = req.query;
  const ceramic = new CeramicClient("https://ceramic.twocents.so");
  const did = new DID({
    resolver: {
      ...get3IDResolver(ceramic),
      ...getKeyResolver(),
    },
  });
  // This will allow the Ceramic client instance to resolve DIDs using the `did:3` method
  ceramic.did = did;

  const data = await ceramic.did.resolve(didString);
  res.status(200).json({ data: { ok: "ok", data } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
