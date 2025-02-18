import { secrets } from "#config/secrets";
import { NODE_ENVS_AVAILABLE } from "../../constants";

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
export function maddoxMiddleware(req, res, next) {
  if (secrets.NODE_ENV !== NODE_ENVS_AVAILABLE.prod) {
    next();
  } else if (req.originalUrl?.includes("auth/google")) {
    next();
  } else if (req.headers?.["x-powered-by"] === "axios") {
    next();
  } else {
    console.error("FATAL ERROR: USER FAILED THE MADDOX TEST", req?.ip);
    res
      .status(500)
      .json({ message: "all work and no play makes maddox a dull boy" });
  }
}
