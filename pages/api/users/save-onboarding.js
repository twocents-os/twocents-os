import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { onboardingData, address } = req.body;
  const existingUser = await repository.findOneDoc(COLLECTIONS.USERS, {
    address,
  });

  const savedUser = await repository.saveDoc(COLLECTIONS.USERS, {
    ...existingUser,
    onboardingData,
    address: address.toLowerCase(),
  });
  res.status(200).json({ data: { onboardingData, savedUser } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
