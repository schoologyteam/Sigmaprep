export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  dlog("User not authed");
  res
    .status(401)
    .json({ message: "401 you do not have access to this page, please login" }); //fix
}
