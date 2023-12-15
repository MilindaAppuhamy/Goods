import { Request, Response, Router } from "express";
import { User } from "../models/user";
import { CartItem, CartItemType } from "../models/cartItem";
import { Item } from "../models/item";

const sendOrderConfirmationEmail = require("../utils/sendOrderConfirmationEmail");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
import express from "express";
const router: Router = express.Router();
require("dotenv").config();
router.use(express.json());

type CheckoutItem = {
  id: number | string;
  name: string;
  image: string;
  priceInCents: number;
  quantity: number;
};

//middleware
const auth = require("../middleware/auth");

router.post(
  "/create-checkout-session",
  auth,
  async (req: Request<{}, {}, { items: CheckoutItem[] }>, res: Response) => {
    if (!req.body.items) return res.status(400).send("Invalid call.");
    try {
      const checkoutItems = req.body.items.map((item: CheckoutItem) => {
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.priceInCents,
          },
          quantity: item.quantity,
        };
      });

      const session = await stripe.checkout.sessions.create({
        line_items: checkoutItems,
        payment_method_types: ["card"],
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["GB"],
        },
        success_url: `${process.env.DOMAIN}/payment?success=true`,
        cancel_url: `${process.env.DOMAIN}/payment?canceled=true`,
      });

      return res.status(200).send({ url: session.url, session_id: session.id });
    } catch (error) {
      if (error instanceof Error) return res.status(500).send(error.message);
      else return res.status(500).send("An unkown server error occured.");
    }
  }
);

router.get(
  "/payment_status/:session_id/:userId",
  auth,
  async (
    req: Request<{ session_id: string; userId: string }>,
    res: Response
  ) => {
    if (!req.params.session_id) return res.status(400).send("Invalid call.");

    try {
      const session_id = req.params.session_id;
      const sessionComplete = await stripe.checkout.sessions.retrieve(
        session_id
      );
      if (sessionComplete.payment_status === "paid") {
        const user = await User.findByPk(req.params.userId, {
          include: [CartItem, Item],
        });
        if (!user) return res.status(500).send("Unknown user");

        //sending the email
        const cartItems = await CartItem.findAll({
          where: { userId: user.getDataValue("id") },
          include: [Item],
        });

        sendOrderConfirmationEmail(
          {
            name: user.getDataValue("username"),
            email: user.getDataValue("email"),
          },
          cartItems
        );

        // clearing the basket
        const idArray =
          user
            .getDataValue("cartItems")
            ?.map((item: CartItemType) => item.id) || [];

        for (let id of idArray) {
          await CartItem.destroy({ where: { id: id } });
        }

        res.send("Cart emptied");
      } else {
        throw new Error("Invalid API call.");
      }
    } catch (error) {
      if (error instanceof Error) return res.status(500).send(error.message);
      else return res.status(500).send("An unkown server error occured.");
    }
  }
);

export { router as paymentRouter };
