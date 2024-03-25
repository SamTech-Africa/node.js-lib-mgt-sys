import express from "express";
import error from "../middleware/error.js";
import auth from "../routes/login.js";
import users from "../routes/users.js";

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
