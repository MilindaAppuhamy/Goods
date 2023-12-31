//Type imports
import { Request, Response, Express } from "express";
import { Sequelize } from "sequelize";
import { userRouter } from "./routes/users";
import { itemRouter } from "./routes/items";
import { cartRouter } from "./routes/carts";
import { paymentRouter } from "./routes/payment";

//imports
import express from "express";
const cors = require("cors");
const db: Sequelize = require("./db");
require("dotenv").config();

//initial variables
const app: Express = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(
  cors({
    exposedHeaders: ["x-auth-token"],
    origin: process.env.DOMAIN,
  })
);

//routes
app.use("/api/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/carts", cartRouter);
app.use("/api/checkout", paymentRouter);

//generic GET request
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Goods - backend server...");
});

// server listening function
app.listen(PORT, async () => {
  try {
    await db.sync();
    console.log(`backend service listening on ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
