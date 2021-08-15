import express, { Request, Response, NextFunction } from "express";
import User from "../models/User";

const loginRouter = express.Router();


loginRouter.post(
  "/login",
  async function login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const loginResult = await User.login({ username, email, password });

      if (loginResult.success) {
      } else {
        res.status(401).send("Invalid username or password");
      }
    } catch (err) {
      next(err);
    }
  }
);

export default loginRouter;