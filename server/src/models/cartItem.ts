import Joi from "joi";
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { Item } from "./item";

const db: Sequelize = require("../db");

// CartType
export type CartItemType = {
  id?: number;
  itemId: number;
  count?: number;
  userId?: number | string;
};

//Model
export const CartItem: ModelStatic<Model<CartItemType>> = db.define(
  "cartItem",
  {
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: Item,
        key: "id",
      },
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  }
);

//CartItem Validation
export function validateCartItem(cartItem: CartItemType): Joi.ValidationResult {
  const schema = Joi.object({
    itemId: Joi.number().required(),
    count: Joi.number().min(1),
  });

  return schema.validate({
    itemId: cartItem.itemId,
    count: cartItem.count,
  });
}
