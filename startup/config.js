import config from "config";

const AccessToken = config.get("jwtPrivateKey");

module.exports = function () {
  if (!AccessToken) {
    throw new Error("FATAL ERROR: Access key is NOT defined.");
  }
};
