// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    SimpleProfile: {
      id: "kjzl6hvfrbw6c5ajfmes842lu09vjxu5956e3xq0xk12gp2jcf9s90cagt2god9",
      accountRelation: { type: "single" },
    },
  },
  objects: {
    SimpleProfile: {
      displayName: { type: "string", required: true },
      owner: { type: "view", viewType: "documentAccount" },
      version: { type: "view", viewType: "documentVersion" },
    },
  },
  enums: {},
  accountData: { simpleProfile: { type: "node", name: "SimpleProfile" } },
};
