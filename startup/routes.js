import express from "express";
import errorHandler from "../middleware/error.js";
import users from "../routes/users.js";
import verifyUser from "../routes/verify.js";
import login from "../routes/login.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/login", login);
  app.use("/api/verify", verifyUser);
  app.use(errorHandler);
};

export default routes;
