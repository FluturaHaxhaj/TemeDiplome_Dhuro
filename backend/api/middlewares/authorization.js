const { verifyToken } = require("../../helpers/jwtHeplers");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (!token) {
      throw new Error("Token isn't valid!");
    }

    const decodedToken = verifyToken(token);
    req.user = decodedToken;

    next();
  } catch {
    return res.status(401).json({
      error: "Invalid token, unauthorized!",
    });
  }
};
