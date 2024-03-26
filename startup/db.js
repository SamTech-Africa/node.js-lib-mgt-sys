import config from "config";
import mongoose from "mongoose";
import winston from "winston";

const db = () => {
  mongoose
    .connect(config.get("db_url"))
    .then(() => console.log("Database is connected successfully"))
    .catch((error) => console.error("Error connecting to database.", error));
};

export default db;
