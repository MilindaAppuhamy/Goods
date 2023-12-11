import { Request, Response, Express } from "express";
import "../models/index";
import { CartItem, CartItemType, validateCartItem } from "../models/cartItem";
import { User } from "../models/user";
import { Item } from "../models/item";

const express = require("express");
const router: Express = express.Router();
router.use(express.json());

//middleware
const auth = require("../middleware/auth");

//retrives all the items in the cart
router.get(
  "/:userId",
  auth,
  async (req: Request<{ userId: number | string }>, res: Response) => {
    //checks if the user exists
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(400).send("The user is undefined.");

    //find all the cartItems of the user
    const cartItems = await CartItem.findAll({
      where: {
        userId: req.params.userId,
      },
      include: Item,
    });
    if (!cartItems) return res.status(400).send("Cart is empty.");

    return res.status(200).send(cartItems);
  }
);

//handles adding a cart item to the cart
router.post(
  "/",
  auth,
  async (req: Request<{}, {}, CartItemType>, res: Response) => {
    try {
      //validate the cart item
      const { error } = validateCartItem(req.body);
      if (error) return res.status(404).send(error.message);

      //checks if the user exist
      const user = await User.findByPk(req.body.userId, {
        include: [CartItem],
      });
      if (!user) return res.status(400).send("The user is undefined.");

      //checks if the item exist
      const item = await Item.findByPk(req.body.itemId);
      if (!item) return res.status(404).send("Invalid item");

      //checks if the item is already in cart
      const cartItems = await CartItem.findAll({
        where: {
          userId: req.body.userId,
        },
      });
      const idx = cartItems.findIndex(
        (cartItem) => cartItem.getDataValue("itemId") === req.body.itemId
      );
      if (idx !== -1) return res.status(400).send("Item is already in cart.");

      //creating the cart item
      const newCartItem = await CartItem.create({
        itemId: req.body.itemId,
        count: 1,
      });

      //add to the users cart
      await user.addCartItem(newCartItem);

      //send the user with added cart items
      await user.reload();
      res.status(200).send(user);
    } catch (error) {
      if (error instanceof Error) return res.status(500).send(error.message);
      else return res.status(500).send("An unkown server error occured.");
    }
  }
);

//handles the count increment and decrement
router.patch(
  "/:cartItemId",
  async (
    req: Request<{ cartItemId: number | string }, {}, CartItemType>,
    res: Response
  ) => {
    //validate the cart item
    const { error } = validateCartItem(req.body);
    if (error) return res.status(404).send(error.message);

    //checks if the user exists
    const user = await User.findByPk(req.body.userId, { include: [CartItem] });
    if (!user) return res.status(400).send("The user is undefined.");

    //checks if the item exists
    const item = await Item.findByPk(req.body.itemId);
    if (!item) return res.status(400).send("The item does not exist.");

    //checks if the cart item exists
    const cartItem = await CartItem.findOne({
      where: {
        id: req.params.cartItemId,
        userId: req.body.userId,
        itemId: req.body.itemId,
      },
    });
    if (!cartItem) return res.status(400).send("The cart item does not exist.");

    //update the count depending on the query
    const action = req.query.action;
    if (
      (action === "decrement" && cartItem.getDataValue("count")! > 1) ||
      (action === "increment" && cartItem.getDataValue("count")! >= 1)
    ) {
      switch (action) {
        case "increment":
          await cartItem.update({
            count: cartItem.getDataValue("count")! + 1,
          });
          break;

        case "decrement":
          await cartItem.update({
            count: cartItem.getDataValue("count")! - 1,
          });
          break;

        default:
          return res.status(400).send("Invalid API call");
      }
    } else {
      await cartItem.destroy();
    }

    //send the user with updated cartItems
    await user.reload();
    return res.status(200).send(user);
  }
);

export { router as cartRouter };
