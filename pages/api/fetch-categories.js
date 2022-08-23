import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const categories = await repository.findManyDoc(COLLECTIONS.CATEGORIES, {});

  res.status(200).json({ data: { categories } });
}
const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
