import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import profileService from "@src/services/profile";
import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { pofId, messageFromReceiver } = req.body;
  const pof = await repository.findOneDoc(COLLECTIONS.POF, {
    _id: pofId,
  });

  const acceptedBy = await repository.findOneDoc(COLLECTIONS.USERS, {
    address: pof.receiverAddress.toLowerCase(),
  });

  const ens = await profileService.fetchEns(acceptedBy.address);
  const acceptedByData = {
    projectId: pof.projectId,
    userId: acceptedBy._id,
    username: acceptedBy?.onboardingData?.init?.userName,
    address: acceptedBy?.address,
    avatarRandomNumber: acceptedBy?.onboardingData?.avatar?.avatarRandomNumber,
    ens,
  };
  await repository.saveDoc(COLLECTIONS.POF, {
    _id: pofId,
    accepted: true,
    messageFromReceiver,
    acceptedDate: new Date(),
    acceptedBy: acceptedByData,
  });

  res.status(200).json({ data: { ok: "done" } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
