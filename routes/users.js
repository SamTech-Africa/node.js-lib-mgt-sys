import _ from "lodash";
import auth from "../middleware/auth";
import bcrypt from "bcrypt";
import { User, validate } from "../models/user";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  let requestBody = req.body;
  const { error } = validate(requestBody);

  if (error) return res.status(400).send(error.detail[0].message);

  let user = await User.findOne({ email: requestBody.email });
  if (user) return res.status(400).send("User already exists.");

  user = new User(_.pick(requestBody, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  const response = _.pick(user, ["id", "name", "email"]);

  res.header("x-auth-token", token).send(response);
});

module.exports = router;
