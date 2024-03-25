import dotenv from "dotenv";

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

module.exports = function () {
  if (!ACCESS_TOKEN) {
    throw new Error("FATAL ERROR: Access key is NOT defined.");
  }
};
