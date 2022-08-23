import superJson from "superjson";

import winston from "winston";
import { Loggly } from "winston-loggly-bulk";

winston.add(
  new Loggly({
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    json: true,
  })
);

const fixJsonData = (data) => {
  const stringData = superJson.stringify(data);
  return superJson.parse(stringData);
};

const logError = (error, tags, meta) => {
  console.error(error, tags, meta);
  winston.log("error", error.message, {
    tags,
    stack: error.stack,
    ...meta,
  });
};

const logErrorFront = (message, stack, tags, meta) => {
  winston.log("error", message, {
    tags: ["frontend", ...tags],
    stack,
    ...meta,
  });
};

const logInfo = (message, tags, meta) => {
  console.log(message, tags, meta);
  winston.log("info", message, {
    tags,
    ...meta,
  });
};

const exports = {
  fixJsonData,
  logError,
  logInfo,
  logErrorFront,
};
export default exports;
