import { wrapperHandler } from "@src/services/wrapperHandler.mjs";
import { CeramicClient } from "@ceramicnetwork/http-client";

async function handler(req, res) {
  const { s: streamId } = req.query;
  const ceramic = new CeramicClient("https://ceramic.twocents.so");
  const data = await ceramic.loadStream(streamId);
  console.log(data.content);

  res.status(200).json({ data: { doc: data.content } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
