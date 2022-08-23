import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { address } = req.query;
  const existingUser = await repository.findOneDoc(COLLECTIONS.USERS, {
    address: address.toLowerCase(),
  });
  if (!existingUser) {
    throw new Error("no such address in username");
  }
  res.status(200).json({ data: { user: existingUser } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
