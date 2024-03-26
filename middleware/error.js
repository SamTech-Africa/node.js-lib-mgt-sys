import winston from "winston";

const errorHandler = (err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send("Internal Server Error.");
};

export default errorHandler;
