import bcrypt from "bcrypt";
import Joi from "joi";
import { User } from "../models/user.js";
import _ from "lodash";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  let requestBody = req.body;

  const { error } = validate(requestBody);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: requestBody.email });

  if (!user) return res.status(400).send("Invalid email or password.");

  if (!user.isVerified)
    return res
      .status(400)
      .send(
        "Your account has not been verified. Kindly verify your account and try again."
      );

  const validPassword = await bcrypt.compare(
    requestBody.password,
    user.password
  );

  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send({ token, message: "Login successful!" });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

export default router;
