import repository, { COLLECTIONS } from "@src/services/repository.mjs";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

import { wrapperHandler } from "@src/services/wrapperHandler.mjs";

async function handler(req, res) {
  const { tweetId, address } = req.body;
  const response = await fetch(
    `https://api.twitter.com/1.1/statuses/show.json?id=${tweetId}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.TWITTER_KEY,
      },
    }
  );

  const data = await response.json();
  const text = data.text;
  const regex = /0x[a-fA-F0-9]{40}/g;
  const found = text.match(regex);
  if (!found) {
    throw new Error("tweet is not contains your wallet address");
  }
  const addressFromTweet = found[0];
  if (addressFromTweet.toLowerCase() !== address.toLowerCase()) {
    throw new Error("tweet  wallet address is not equal to current address");
  }

  const existingUser = await repository.findOneDoc(COLLECTIONS.USERS, {
    address: address.toLowerCase(),
  });

  await repository.saveDoc(COLLECTIONS.USERS, {
    ...existingUser,
    verified: true,
    verificationTweetId: tweetId,
  });

  res.status(200).json({ data: { verified: "done" } });
}

const wrappedHandler = (req, res) => wrapperHandler("POST", req, res, handler);
export default wrappedHandler;
