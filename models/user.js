import config from "config";
import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const Roles = ["Admin", "User"];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },
  role: {
    type: String,
    required: true,
    enum: Roles,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, roles: this.roles.Admin },
    config.get("jwtPrivateKey")
  );

  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.string()
      .valid(...Roles)
      .required(),
  });

  return schema.validate(user);
}

export { User, validateUser };
