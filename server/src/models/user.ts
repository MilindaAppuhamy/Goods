import Joi from "joi";
import {
  DataTypes,
  HasManyAddAssociationMixin,
  Model,
  ModelStatic,
  Sequelize,
} from "sequelize";
import { ItemType } from "./item";
import { CartItemType } from "./cartItem";
var jwt = require("jsonwebtoken");
require("dotenv").config();

const db: Sequelize = require("../db");

//User type
export type UserType = {
  username: string;
  email: string;
  password: string;
  access_token?: string;
};

//Model
export const User: ModelStatic<
  Model<UserType> & {
    addItem: HasManyAddAssociationMixin<Model<ItemType>, ItemType>;
    addCartItem: HasManyAddAssociationMixin<Model<CartItemType>, CartItemType>;
    generateAuthToken: () => string;
  }
> = db.define(
  "user",
  {
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
    access_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["access_token"] },
    },
  }
);

User.prototype.generateAuthToken = function () {
  const access_token = jwt.sign(
    { id: this.id, email: this.email },
    process.env.JWT_SECRET_KEY
  );
  this.setDataValue("access_token", access_token);
  return access_token;
};

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
