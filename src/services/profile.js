import { providers } from "ethers";
import repository, { COLLECTIONS } from "@src/services/repository.mjs";

const resolveAddress = async (address) => {
  const contractRegex = new RegExp(/^0x[a-fA-F0-9]{40}$/);
  const ethRegex = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
  );
  if (contractRegex.test(address)) {
    return address.toLowerCase();
  }
  if (ethRegex.test(address)) {
    const provider = providers.getDefaultProvider();

    const resolvedAddress = await provider.resolveName(address);
    return resolvedAddress.toLowerCase();
  }
  throw new Error("Invalid address format");
};

const fetchEns = async (address) => {
  const provider = providers.getDefaultProvider();
  return provider.lookupAddress(address);
};

const fetchUserData = async (address) => {
  const user = await repository.findOneDoc(COLLECTIONS.USERS, {
    address: address.toLowerCase(),
  });
  if (!user) {
    return null;
  }
  return {
    verified: user.verified,
    userName: user.onboardingData?.init?.userName,
    bio: user.onboardingData?.init?.bio,
    avatarRandomNumber: user.onboardingData?.avatar?.avatarRandomNumber,
    links: user.links,
    skills: user.onboardingData?.contributions?.skills,
    avatarImageUrl: user.avatarImageUrl,
    coverImageUrl: user.coverImageUrl,
  };
};

const resolveEnsAaddress = (address) => {
  const ethRegex = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
  );

  if (ethRegex.test(address)) {
    return address;
  }
  const provider = providers.getDefaultProvider();
  return provider.lookupAddress(address);
};

const fetchProfileInfoForProjectPage = async (address) => {
  const userData = await fetchUserData(address);

  return {
    address,
    userData,
  };
};

const fetchProfileInfoForEdit = async (address) => {
  const resolvedAddress = await resolveAddress(address);
  const userData = await fetchUserData(resolvedAddress);

  return {
    address: resolvedAddress,
    userData,
  };
};

const updateProfile = async (data) => {
  const existingUser = await repository.findOneDoc(COLLECTIONS.USERS, {
    address: data.address.toLowerCase(),
  });

  if (!existingUser) {
    throw new Error("cant find user to update profile");
  }

  existingUser.onboardingData.init.userName = data.userName;
  existingUser.onboardingData.init.bio = data.bio;
  existingUser.onboardingData.contributions.skills = data.skills;
  existingUser.links = data.links;
  existingUser.avatarImageUrl = data.avatarImageUrl;
  existingUser.coverImageUrl = data.coverImageUrl;
  return repository.saveDoc(COLLECTIONS.USERS, existingUser);
};

const exports = {
  fetchProfileInfoForProjectPage,
  fetchEns,
  fetchProfileInfoForEdit,
  fetchUserData,
  updateProfile,
  resolveAddress,
  resolveEnsAaddress,
};
export default exports;
