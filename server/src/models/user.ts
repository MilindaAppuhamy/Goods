import Joi from "joi";
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

const db: Sequelize = require("../db");

//User type
export type UserType = {
  username: string;
  email: string;
  password: string;
};

//Model
export const User: ModelStatic<Model<UserType>> = db.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//register Validation
export function validateUser(user: UserType): Joi.ValidationResult {
  const schema = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate({
    username: user.username,
    email: user.email,
    password: user.password,
  });
}

//login Validation
export type UserLoginType = {
  email: string;
  password: string;
};

export function validateUserLogin(
  userLogin: UserLoginType
): Joi.ValidationResult {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate({
    email: userLogin.email,
    password: userLogin.password,
  });
}
