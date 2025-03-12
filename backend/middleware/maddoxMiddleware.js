import { secrets } from "#config/secrets.js";
import { NODE_ENVS_AVAILABLE } from "../../constants.js";

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
export function maddoxMiddleware(req, res, next) {
  if (secrets.NODE_ENV !== NODE_ENVS_AVAILABLE.prod) {
    next(); // npx wait on kept trying to ping the server but failed cuz of this lol
  } else if (
    req.originalUrl?.includes("auth/google") ||
    req.originalUrl?.includes("auth/microsoft")
  ) {
    next();
  } else if (req.headers?.["x-powered-by"] === "axios") {
    next();
  } else {
    next(); // this fixed an issue with google bots, not sure why as they click buttons which use axios which call my api with the correct header.
    // console.error("FATAL ERROR: USER FAILED THE MADDOX TEST", req?.ip);
    // res
    //   .status(500)
    //   .json({ message: "all work and no play makes maddox a dull boy" });
  }
}
