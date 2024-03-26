import config from "config";
import mongoose from "mongoose";
import winston from "winston";

module.exports = function () {
  mongoose
    .connect(config.get("db_url"))
    .then(() => winston.info("Database is connected successfully"))
    .catch((error) => winston.error("Error connecting to database.", error));
};
