import dotenv from "dotenv";
import mongoose from "mongoose";
import winston from "winston";

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

module.exports = function () {
  mongoose
    .connect(MONGO_URL)
    .then(() => winston.info("Database is connected successfully"))
    .catch((error) => winston.error("Error connecting to database.", error));
};
