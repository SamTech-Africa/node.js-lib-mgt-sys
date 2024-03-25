import express from "express";
import dotenv from "dotenv";
import winston from "winston";
import routes from "./startup/routes.js";
const app = express();

dotenv.config();

routes(app);

const port = process.env.PORT || 5000;

app.listen(port, () => winston.info(`listening on port ${port}`));
