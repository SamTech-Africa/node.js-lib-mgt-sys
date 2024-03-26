import winston from "winston";
import "winston-mongodb";
import "express-async-errors";
import config from "config";

const logging = () => {
  winston.exceptions.handle(
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
    })
  );

  process.on("unhandledRejection", (exceptions) => {
    throw exceptions;
  });

  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
    })
  );

  winston.add(
    new winston.transports.MongoDB({
      db: config.get("db_url"),
      level: "info",
    })
  );
};

export default logging;
