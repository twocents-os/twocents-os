import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const user = await repository.findOneDoc(COLLECTIONS.USERS, {
    "onboardingData.init.userName": req.query.username,
  });

  let isUserNameUnique = !!!user;
  if (!isUserNameUnique && req.query.address === user.address) {
    isUserNameUnique = true;
  }
  res.status(200).json({ data: { isUserNameUnique } });
}

const wrappedHandler = (req, res) => wrapperHandler("GET", req, res, handler);
export default wrappedHandler;
