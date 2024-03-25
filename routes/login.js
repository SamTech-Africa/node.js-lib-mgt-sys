import bcrypt from "bcrypt";
import Joi from "joi";
import { User, validate } from "../models/user";
import _ from "lodash";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  let requestBody = req.body;

  const { error } = validate(requestBody);

  if (error) return res.status(400).send(error.detail[0].message);

  let user = await User.findOne({ email: requestBody.email });

  if (!user) return res.status(400).send("Invalid email or password.");
});
