import express, { Request, Response, NextFunction } from "express";
import Message, {IMessageInput} from '../dynamoDB/model/Message';
import JSONResult from  '../common/JsonResult'

const messageRouter = express.Router();

messageRouter.post(
  "/create-message",
  async function createMessage(req: Request, res: Response, next: NextFunction) {
    
    try {
      const message: IMessageInput | undefined = req.body;
      console.log(req.body)
      if(!message?.message || !message.name || (!message.email && !message.phone)) {
        throw new Error("Missing message, name or email or phone")
      }


      const result = await Message.createMessage(message.name, message.message, message.phone, message.email)
      if(typeof result !== 'string') {
        // 如果返回的不是 uuid， 那么创建 message 出错
        throw new Error(result.message)
      }

      res.json(JSONResult.ok("Message has been sent! "))

    } catch (err) {
        res.json(JSONResult.error("Missing message, name or email or phone"));
    }
  }
);

export default messageRouter;