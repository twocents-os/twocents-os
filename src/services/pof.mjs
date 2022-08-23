import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import userService from "@src/services/user.mjs";

const fetchPOFById = (pofId) => {
  return repository.findOneDoc(COLLECTIONS.POF, {
    _id: pofId,
  });
};

const fetchPOFByTransactionHash = (transactionHash) => {
  return repository.findOneDoc(COLLECTIONS.POF, {
    transactionHash,
  });
};

const fetchPOFsByProjectId = (projectId) => {
  return repository.findManyDoc(COLLECTIONS.POF, {
    projectId,
  });
};

const fetchAcceptedPOFsByProjectId = (projectId) => {
  return repository.aggregateQuery(COLLECTIONS.POF, [
    { $match: { projectId, accepted: true } },
    {
      $lookup: {
        from: "users",
        localField: "resolvedReceiverAddress",
        foreignField: "address",
        as: "receiverUser",
      },
    },
    { $unwind: { path: "$receiverUser" } },
  ]);
};

const fetchPOFsMintedByAddress = (address) => {
  const searchRegex = new RegExp(`^${address}$`, "i");
  return repository.findManyDoc(COLLECTIONS.POF, {
    mintedBy: searchRegex,
  });
};

const fetchPOFsReceivedByAddress = (address) => {
  const searchRegex = new RegExp(`^${address}$`, "i");
  return repository.findManyDoc(COLLECTIONS.POF, {
    resolvedReceiverAddress: searchRegex,
  });
};

const fetchPOFsByProjectIdAndReceiverAddress = (address, projectId) => {
  const searchRegex = new RegExp(`^${address}$`, "i");
  return repository.findManyDoc(COLLECTIONS.POF, {
    resolvedReceiverAddress: searchRegex,
    projectId,
  });
};

const submitPOF = async (data) => {
  const mintedByUser = await userService.fetchUserByAddress(data.mintedBy);
  const receiverUser = await userService.fetchUserByAddress(
    data.resolvedReceiverAddress
  );

  const dataToSave = {
    ...data,
    ...(mintedByUser && {
      mintedByUserInfo: {
        userName: mintedByUser.onboardingData.init.userName,
        avatarImageUrl: mintedByUser.avatarImageUrl,
      },
    }),
    ...(receiverUser && {
      receiverUserInfo: {
        userName: receiverUser.onboardingData.init.userName,
        avatarImageUrl: receiverUser.avatarImageUrl,
      },
    }),
  };
  const savedPOF = await repository.saveDoc(COLLECTIONS.POF, dataToSave);
  return savedPOF;
};

const exports = {
  fetchPOFById,
  fetchPOFsByProjectId,
  fetchPOFsReceivedByAddress,
  fetchPOFsMintedByAddress,
  submitPOF,
  fetchAcceptedPOFsByProjectId,
  fetchPOFsByProjectIdAndReceiverAddress,
  fetchPOFByTransactionHash,
};
export default exports;
