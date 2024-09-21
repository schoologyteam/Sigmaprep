import { getCurTimeUTCFormatted } from "./dateFunctions.js";

export function errLogging(err, errMsg) {
  console.log(`[${getCurTimeUTCFormatted()}] ${errMsg}\n${err}`);
}

global.dlog = function (message, ...params) {
  if (NODE_ENV === "local") {
    console.log(message, ...params);
  }
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
