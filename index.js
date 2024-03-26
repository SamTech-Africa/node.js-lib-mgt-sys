import express from "express";
import config from "config";
import winston from "winston";
import routes from "./startup/routes.js";
import db from "./startup/db.js";
import logging from "./startup/logging.js";
const app = express();

routes(app);
db();
logging();

const port = process.env.PORT || config.get("port");

app.listen(port, () => winston.info(`listening on port ${port}`));
