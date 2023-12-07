import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req: Request, res: Response, next: NextFunction) {
  const authToken = req.header("x-auth-token");
  if (!authToken) return res.status(401).send("Access denied.");

  try {
    jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};
