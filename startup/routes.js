import express from "express";
import errorHandler from "../middleware/error.js";
import login from "../routes/login.js";
import users from "../routes/users.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/login", login);
  app.use(errorHandler);
};

export default routes;
