import jwt from "jsonwebtoken";
import config from "config";
import express from "express";
import { User } from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied.No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    const user = await User.findById(decoded._id);

    if (!user) return res.status(404).send("User not found.");

    user.isVerified = true;
    await user.save();

    res.send("Account verified successfully.");
  } catch (exception) {
    if (exception.name === "TokenExpiredError") {
      return res.status(401).send("Token has expired.");
    }
    res.status(400).send("Invalid token.");
  }
});

export default router;
