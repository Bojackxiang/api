import express, { Request, Response, NextFunction } from "express";
import Message, { IMessage } from "../models/Message";

const messageRouter = express.Router();


messageRouter.post(
  "/create-message",
  async function login(req: Request, res: Response, next: NextFunction) {
    const response = {
      success: true,
      message: undefined,
    }
    try {
      const message: IMessage | undefined = req.body;
      if(!message){
        throw new Error('There is no message body passed in')
      }
      console.log(message)
      const addMessageResult = await Message.addMessage(message)
      console.log(addMessageResult)


      res.send("message create message")
    } catch (err) {
      response.success = false
      response.message = err.message
      res.json(response)
    }
  }
);

export default messageRouter;