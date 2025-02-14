import { getCurTimeUTCFormatted } from "./dateFunctions.js";
import { secrets } from "#config/secrets.js";
import "#config/config.js";
import { NODE_ENVS_AVAILABLE } from "../../constants.js";

export function errLogging(err, errMsg) {
  console.log(`[${getCurTimeUTCFormatted()}] ${errMsg}\n${err}`);
}
/**
 * Logs only if on dev mode
 */
global.dlog = function (message, ...params) {
  if (
    secrets.NODE_ENV === NODE_ENVS_AVAILABLE.local ||
    secrets.NODE_ENV === NODE_ENVS_AVAILABLE.test
  ) {
    console.log(message, ...params);
  }
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
