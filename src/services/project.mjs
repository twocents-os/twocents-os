import repository, { COLLECTIONS } from "@src/services/repository.mjs";
import userService from "@src/services/user.mjs";

const fetchProjectOwnerAddressByProjectId = async (projectId) => {
  const existingProject = await repository.findOneDoc(COLLECTIONS.PROJECTS, {
    _id: projectId,
  });
  return existingProject.submittedBy;
};
const fetchProjectById = async (projectId) => {
  return repository.findOneDoc(COLLECTIONS.PROJECTS, {
    _id: projectId,
  });
};
const fetchProjectsByAddress = (address) => {
  return repository.findManyDoc(COLLECTIONS.PROJECTS, {
    submittedBy: address,
  });
};

const fetchProjectFriendsByProjectId = (projectId) => {
  return repository.findManyDoc(COLLECTIONS.PROJECT_FIRENDS, {
    projectId,
  });
};

const fetchProjectsByIds = (ids) => {
  return repository.findManyDoc(COLLECTIONS.PROJECTS, {
    _id: { $in: ids },
  });
};

const submitFeedback = async (data) => {
  const { submittedBy } = data;

  const user = await userService.fetchUserByAddress(submittedBy);

  return repository.saveDoc(COLLECTIONS.FEEDBACKS, {
    ...data,
    submittedBy: data.submittedBy.toLowerCase(),
    userInfo: {
      userName: user.onboardingData.init.userName,
      avatarImageUrl: user.avatarImageUrl,
    },
  });
};

const fetchFeedbacksByProjectId = (projectId) => {
  return repository.findManyDoc(COLLECTIONS.FEEDBACKS, {
    projectId,
  });
};

const exports = {
  fetchProjectOwnerAddressByProjectId,
  fetchProjectById,
  fetchProjectsByAddress,
  fetchProjectFriendsByProjectId,
  fetchProjectsByIds,
  submitFeedback,
  fetchFeedbacksByProjectId,
};
export default exports;
