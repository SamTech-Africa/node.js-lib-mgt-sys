import _ from "lodash";
// import auth from "../middleware/auth.js";
import bcrypt from "bcrypt";
import { User, validateUser } from "../models/user.js";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  let requestBody = req.body;
  const { error } = validateUser(requestBody);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: requestBody.email });
  if (user) return res.status(400).send("User already exists.");

  user = new User(_.pick(requestBody, ["name", "email", "password", "role"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  const response = _.pick(user, ["id", "name", "email", "role"]);

  res.header("x-auth-token", token).send(response);
});

export default router;
