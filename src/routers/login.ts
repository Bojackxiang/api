import express, { Request, Response, NextFunction } from 'express'
import User from '../models/User';
const loginRouter = express.Router();


export default async function name(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    const loginResult = await User.login({email, password});
    
    if (loginResult.success) {
      
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (err) {
    next(err);
  }
}