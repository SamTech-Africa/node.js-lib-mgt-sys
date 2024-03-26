import config from "config";
import mongoose from "mongoose";
import winston from "winston";

const db = () => {
  mongoose
    .connect(config.get("db_url"), {
      autoIndex: false,
    })
    .then(() => winston.info("Database is connected successfully"))
    .catch((error) => winston.error("Error connecting to database.", error));
  process.exit(-1);
};

export default db;
