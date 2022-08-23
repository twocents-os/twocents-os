import repository, { COLLECTIONS } from "./repository.mjs";

const fetchUserByAddress = (address) => {
  const searchRegex = new RegExp(`^${address}$`, "i");
  return repository.findOneDoc(COLLECTIONS.USERS, {
    address: searchRegex,
  });
};

const exports = {
  fetchUserByAddress,
};
export default exports;
