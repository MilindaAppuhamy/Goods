import { Sequelize } from "sequelize";
import { Item } from "./models/item";
import { User } from "./models/user";
import { CartItem } from "./models/cartItem";
const bcrypt = require("bcrypt");

const itemData = require("../../server/itemSeedData.json");
const userData = require("../../server/userSeedData.json");

const db: Sequelize = require("./db");

const seed = async () => {
  //User - Item association
  User.hasMany(Item);
  Item.belongsTo(User);

  //User - CartItem association
  User.hasMany(CartItem);
  CartItem.belongsTo(User);

  //Item - CartItem association
  Item.hasOne(CartItem);
  CartItem.belongsTo(Item);

  //starting db
  await db.sync();

  // add the data
  const items = await Item.bulkCreate(itemData);
  const users = (await User.bulkCreate(userData)) as any;

  //hashing the passwords
  for (let user of users) {
    const salt: string = await bcrypt.genSalt(6);
    let hashedPassword = await bcrypt.hash(user.password, salt);
    await user.update({ password: hashedPassword });
  }

  //adding some items to users
  Promise.all([
    users[0].addItem(items[0]),
    users[0].addItem(items[1]),
    users[0].addItem(items[2]),
    users[1].addItem(items[3]),
    users[1].addItem(items[4]),
    users[1].addItem(items[5]),
  ]);

  console.log("db populated with initial data!");
};

seed();
