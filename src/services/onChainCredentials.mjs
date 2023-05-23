import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import userService from "@src/services/user.mjs";

const submitOnChainCredential = async (data) => {
  const mintedByUser = await userService.fetchUserByAddress(data.mintedBy);
  const receiverUser = await userService.fetchUserByAddress(
    data.receiverAddress
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
  return repository.saveDoc(COLLECTIONS.ON_CHAIN_CREDENTIALS, dataToSave);
};

const fetchOnChainCredentialsMintedByAddress = (address) => {
  const searchRegex = new RegExp(`^${address}$`, "i");
  return repository.findManyDoc(COLLECTIONS.ON_CHAIN_CREDENTIALS, {
    mintedBy: searchRegex,
  });
};

const fetchOnChainCredentialsReceivedByAddress = (address) => {
  const searchRegex = new RegExp(`^${address}$`, "i");
  return repository.findManyDoc(COLLECTIONS.ON_CHAIN_CREDENTIALS, {
    receiverAddress: searchRegex,
  });
};

const exports = {
  submitOnChainCredential,
  fetchOnChainCredentialsMintedByAddress,
  fetchOnChainCredentialsReceivedByAddress,
};
export default exports;
