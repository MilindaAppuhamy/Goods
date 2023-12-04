//Type imports
import { Request, Response, Express } from "express";
import { Sequelize } from "sequelize";
import { userRouter } from "./routes/users";

//imports
const express = require("express");
const cors = require("cors");
const db: Sequelize = require("./db");

//initial variables
const app: Express = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());

//routes
app.use("/api/users", userRouter);

//generic GET request
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Goods - backend server...");
});

// server listening function
app.listen(PORT, async () => {
  try {
    await db.sync();
    console.log(`listening on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
