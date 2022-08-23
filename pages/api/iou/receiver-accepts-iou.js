import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import profileService from "@src/services/profile";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { iouId, messageFromReceiver } = req.body;
  const iou = await repository.findOneDoc(COLLECTIONS.IOU, {
    _id: iouId,
  });

  const acceptedBy = await repository.findOneDoc(COLLECTIONS.USERS, {
    address: iou.receiverAddress.toLowerCase(),
  });

  const ens = await profileService.fetchEns(acceptedBy.address);
  const acceptedByData = {
    projectId: iou.projectId,
    userId: acceptedBy._id,
    username: acceptedBy?.onboardingData?.init?.userName,
    address: acceptedBy?.address,
    avatarRandomNumber: acceptedBy?.onboardingData?.avatar?.avatarRandomNumber,
    ens,
  };
  await repository.saveDoc(COLLECTIONS.IOU, {
    _id: iouId,
    accepted: true,
    messageFromReceiver,
    acceptedDate: new Date(),
    acceptedBy: acceptedByData,
  });

  res.status(200).json({ data: { ok: "done" } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
