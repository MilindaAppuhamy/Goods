import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import Joi from "joi";

const db: Sequelize = require("../db");

//Item type
export type ItemType = {
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
  userId?: number | string;
};

//valid categories
const validCategories: string[] = ["clothing", "technology", "food"];

//Model
export const Item: ModelStatic<Model<ItemType>> = db.define("item", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM(...validCategories),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

//item Validation
export function validateItem(item: ItemType): Joi.ValidationResult {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    category: Joi.string()
      .valid(...validCategories)
      .required(),
    image: Joi.string().min(5).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(20).required(),
    quantity: Joi.number().min(1).max(100).required(),
  });

  return schema.validate({
    name: item.name,
    category: item.category,
    image: item.image,
    price: item.price,
    description: item.description,
    quantity: item.quantity,
  });
}
