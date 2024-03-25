import dotenv from "dotenv";

dotenv.config();
const AccessToken = process.env.ACCESS_TOKEN;

module.exports = function () {
  if (!AccessToken) {
    throw new Error("FATAL ERROR: Access key is NOT defined.");
  }
};
