import _ from "lodash";
import { createContext, useContext } from "react";
import useMethods from "use-methods";
import frontUtils from "@src/shared/front-utils";
export const initialState = {
  currentAddress: null,
  isApiInProgress: false,
  comments: {},
  searchText: "",
  user: {},
  skipOnboardingGuidStep: false,
};

export const methods = (state) => ({
  reset() {
    return initialState;
  },

  setCurrentAddress(value) {
    state.currentAddress = value;
  },
  startCallingApi() {
    state.isApiInProgress = true;
  },
  endCallingApi() {
    state.isApiInProgress = false;
  },
  setComments(value) {
    state.comments = value;
  },
  setSelectedCommentId(commentId) {
    state.selectedCommentId = commentId;
  },
  setEditModeCommentId(commentId) {
    state.editModeCommentId = commentId;
  },
  setTags(tags) {
    state.tags = tags;
  },
  setSearchText(value) {
    state.searchText = value;
  },
  setWrongNetwork(value) {
    state.wrongNetwork = value;
  },
  setCurrentAddressUserName(username) {
    state.currentAddressUserName = username;
  },

  addNewComment(comment) {
    const path = comment.path
      ? [...comment.path].reverse().join(".replies.") +
        ".replies." +
        comment._id
      : comment._id;
    _.set(state.comments, path, comment);
  },
  updateCommentVote(comment) {
    let path = comment.path
      ? [...comment.path].reverse().join(".replies.") +
        ".replies." +
        comment._id
      : comment._id;
    path += ".votes";
    _.set(state.comments, path, comment.votes);
  },
  updateCommentText(comment) {
    let path = comment.path
      ? [...comment.path].reverse().join(".replies.") +
        ".replies." +
        comment._id
      : comment._id;
    path += ".text";
    _.set(state.comments, path, comment.text);
  },
  openConnectToWallet(afterOnboardingUrl) {
    state.afterOnboardingUrl = afterOnboardingUrl;
    state.isWalletModalOpen = true;
  },
  onWalletModalClose() {
    state.isWalletModalOpen = false;
  },
  setUser(user) {
    state.user = user;
  },
  setUserAsVerified() {
    if (!state.user) {
      console.log("attampt to set verified without having user");
      return;
    }
    state.user.verified = true;
  },
  setSkipOnboardingGuideStep(value) {
    state.skipOnboardingGuidStep = value;
  },
});

const PageContext = createContext();
export const StateProvider = ({ children }) => {
  return (
    <PageContext.Provider value={useMethods(methods, initialState)}>
      {children}
    </PageContext.Provider>
  );
};
export const usePageState = () => useContext(PageContext);
