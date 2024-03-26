import express from "express";
import config from "config";
import winston from "winston";
import routes from "./startup/routes.js";
const app = express();

routes(app);

const port = process.env.PORT || config.get("port");

app.listen(port, () => console.log(`listening on port ${port}`));
