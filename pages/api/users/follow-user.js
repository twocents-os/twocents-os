import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { from, to } = req.body;
  const fromUser = await repository.findOneDoc(COLLECTIONS.USERS, {
    address: from.toLowerCase(),
  });
  const toUser = await repository.findOneDoc(COLLECTIONS.USERS, {
    address: to.toLowerCase(),
  });
  if (!fromUser) {
    throw new Error("cant find user");
  }

  const followExisting = await repository.findOneDoc(COLLECTIONS.FOLLOW, {
    fromUserId: fromUser._id,
    toAddress: to.toLowerCase(),
  });
  if (followExisting) {
    throw new Error("You are already following this user");
  }

  const savedFollow = await repository.saveDoc(COLLECTIONS.FOLLOW, {
    fromUserId: fromUser._id,
    toUserId: toUser?._id,
    fromAddress: fromUser.address,
    toAddress: to.toLowerCase(),
    fromUsername: fromUser?.onboardingData?.init?.userName,
    toUsername: toUser?.onboardingData?.init?.userName,
    fromUserAvatarImageRandomNumber:
      fromUser?.onboardingData?.avatar?.avatarRandomNumber,
    toUserAvatarImageRandomNumber:
      toUser?.onboardingData?.avatar?.avatarRandomNumber,
  });
  res.status(200).json({ data: { savedFollow } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
