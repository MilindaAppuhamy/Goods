import { Request, Response, Router } from "express";
import { ValidationResult } from "joi";
import { Item, ItemType, validateItem } from "../models/item";
import { User } from "../models/user";
import "../models/index";

import express from "express";
const router: Router = express.Router();
router.use(express.json());

//middleware
const auth = require("../middleware/auth");

//get all items endpoint
router.get("/", async (req: Request, res: Response) => {
  const items = await Item.findAll({
    include: User,
  });
  res.send(items);
});

//item by userId
router.get(
  "/:userId",
  auth,
  async (req: Request<{ userId: number | string }>, res: Response) => {
    //checks if the user exists
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(400).send("The user is undefined.");

    const item = await Item.findAll({
      where: {
        userId: req.params.userId,
      },
      include: User,
    });
    if (!item) return res.status(400).send("Item does not exist.");

    return res.status(200).send(item);
  }
);

//post an item
router.post(
  "/",
  auth,
  async (
    req: Request<{}, {}, ItemType & { userId: number }>, //req.body type is the type of the item and the userId: number
    res: Response
  ) => {
    //validate the item object
    const { error }: ValidationResult = validateItem(req.body);
    if (error) return res.status(404).send(error.message);

    //checks if the item already exists
    const exists = await Item.findOne({
      where: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      },
    });
    if (exists) return res.status(400).send("The item already exists.");

    try {
      //setting the user of the item
      const user = await User.findByPk(req.body.userId);
      if (!user) return res.status(400).send("The user is undefined.");

      //creating the item and save
      const item = await Item.create({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
      });

      await user.addItem(item);

      return res.status(200).send(item);
    } catch (error) {
      if (error instanceof Error) return res.status(500).send(error.message);
      else return res.status(500).send("An unkown server error occured.");
    }
  }
);

//update an item
router.patch(
  "/:id",
  auth,
  async (
    req: Request<{ id: number | string }, {}, ItemType & { userId: number }>,
    res: Response
  ) => {
    //validate the item object
    const { error }: ValidationResult = validateItem(req.body);
    if (error) return res.status(404).send(error.message);

    //checks if the item exists
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(400).send("The item does not exist.");

    //checks if the user exists
    const user = await User.findByPk(req.body.userId);
    if (!user) return res.status(400).send("The user is undefined.");

    //checks if the item belongs to user
    if (req.body.userId !== item.getDataValue("userId"))
      return res.status(400).send("The item does not belong to user.");

    //updating the item in the database
    try {
      const updatedItem = await item.update({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
      });
      return res.status(200).send(updatedItem);
    } catch (error) {
      if (error instanceof Error) return res.status(500).send(error.message);
      else return res.status(500).send("An unkown server error occured.");
    }
  }
);

//delete an item
router.delete(
  "/:id",
  auth,
  async (req: Request<{ id: number | string }>, res: Response) => {
    //checks if the item exists
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(400).send("The item does not exist.");

    //deleting the item in the database
    try {
      const deletedItem = await item.destroy();
      return res.status(200).send(deletedItem);
    } catch (error) {
      if (error instanceof Error) return res.status(500).send(error.message);
      else return res.status(500).send("An unkown server error occured.");
    }
  }
);

export { router as itemRouter };
