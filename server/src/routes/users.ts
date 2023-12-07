import { Request, Response, Express } from "express";
import { ValidationResult } from "joi";
import {
  validateUser,
  User,
  validateUserLogin,
  UserType,
  UserLoginType,
} from "../models/user";
import { passwordCheck } from "../utils/passwordCheck";
import { Item } from "../models/item";

const express = require("express");
const bcrypt = require("bcrypt");
const router: Express = express.Router();
router.use(express.json());

//get all users endpoint
router.get("/", async (req: Request, res: Response) => {
  const users = await User.findAll({ include: [Item] });
  res.send(users);
});

//get user by access token
router.get(
  "/:accessToken",
  async (req: Request<{ accessToken: string }>, res: Response) => {
    const user = await User.findOne({
      where: {
        access_token: req.params.accessToken,
      },
    });
    if (!user) return res.status(400).send("User invalid.");

    return res.status(200).send(user);
  }
);

//user register endpoint
router.post(
  "/register",
  async (req: Request<{}, {}, UserType>, res: Response) => {
    //validate the user object
    const { error }: ValidationResult = validateUser(req.body);
    if (error) return res.status(404).send(error.message);

    //password check
    const result: string = passwordCheck(req.body.password);
    if (result !== "passed") return res.status(404).send(result);

    //checks if the email already exists
    const exists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exists)
      return res.status(400).send("An account with this email already exists.");

    //hashing the password
    const salt: string = await bcrypt.genSalt(6);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    //adding the user to the database
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      //setting the auth token
      const token = user.generateAuthToken();
      res.setHeader("x-auth-token", token);
      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof Error) return res.status(500).send(error.message);
      else return res.status(500).send("An unkown server error occured.");
    }
  }
);

//user login endpoint
router.post(
  "/login",
  async (req: Request<{}, {}, UserLoginType>, res: Response) => {
    //validate the user object
    const { error }: ValidationResult = validateUserLogin(req.body);
    if (error) return res.status(404).send(error.message);

    //find user by email
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(400).send("User does not exist.");

    //password matching
    const result = await bcrypt.compare(
      req.body.password,
      user.getDataValue("password")
    );
    if (!result) return res.status(404).send("Incorrect email or password.");

    //setting the auth token
    const token = user.generateAuthToken();
    res.setHeader("x-auth-token", token);

    //user gains access
    return res.status(200).send(user);
  }
);

export { router as userRouter };
