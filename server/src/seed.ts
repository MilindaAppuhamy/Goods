import { Sequelize } from "sequelize";
import { Item } from "./models/item";
import { User } from "./models/user";
import { CartItem } from "./models/cartItem";

const itemData = require("../../server/itemSeedData.json");
const db: Sequelize = require("./db");

const seed = async () => {
  //User - Item association
  User.hasMany(Item);
  Item.belongsTo(User);

  //User - CartItem association
  User.hasMany(CartItem);
  CartItem.belongsTo(User);

  //starting db
  await db.sync();

  // add the data
  await Item.bulkCreate(itemData);

  console.log("db populated with initial data!");
};

seed();
