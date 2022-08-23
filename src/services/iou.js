import repository, { COLLECTIONS } from "@src/services/repository.mjs";

const fetchIOUById = async (iouId) => {
  return repository.findOneDoc(COLLECTIONS.IOU, {
    _id: iouId,
  });
};
const fetchIOUsByProjectId = async (projectId) => {
  return repository.findManyDoc(COLLECTIONS.IOU, {
    projectId,
  });
};
const fetchIOUsMintedByAddress = async (address) => {
  const searchRegex = new RegExp(`^${address}$`, "i");
  return repository.findManyDoc(COLLECTIONS.IOU, {
    mintedBy: searchRegex,
  });
};
const fetchIOUsReceivedByAddress = async (address) => {
  const searchRegex = new RegExp(`^${address}$`, "i");
  return repository.findManyDoc(COLLECTIONS.IOU, {
    receiverAddress: searchRegex,
  });
};

const exports = {
  fetchIOUById,
  fetchIOUsByProjectId,
  fetchIOUsReceivedByAddress,
  fetchIOUsMintedByAddress,
};
export default exports;
