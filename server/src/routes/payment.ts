import { Request, Response, Express } from "express";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const express = require("express");
const router: Express = express.Router();
router.use(express.json());

type CheckoutItem = {
  id: number | string;
  name: string;
  priceInCents: number;
  quantity: number;
};

//middleware
const auth = require("../middleware/auth");

router.post(
  "/",
  auth,
  async (req: Request<{}, {}, { items: CheckoutItem[] }>, res: Response) => {
    if (!req.body.items) return res.status(400).send("Invalid call.");
    try {
      const checkoutItems = req.body.items.map((item) => {
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: item.name,
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
        success_url: `${process.env.DOMAIN}/payment?success=true`,
        cancel_url: `${process.env.DOMAIN}/payment?canceled=true`,
      });
      return res.status(200).send({ url: session.url });
    } catch (error) {
      if (error instanceof Error) return res.status(500).send(error.message);
      else return res.status(500).send("An unkown server error occured.");
    }
  }
);

export { router as paymentRouter };
