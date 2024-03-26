import jwt from "jsonwebtoken";
import config from "config";

dotenv.config();
const AccessToken = config.get("jwtPrivateKey");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, AccessToken);
    req.use = decoded;
    next();
  } catch (e) {
    res.status(400).send("Invalid token.");
  }
};
