import express, { Request, Response, NextFunction } from 'express'
import User from '../models/User';
const healthCheckRouter = express.Router();

healthCheckRouter.get('/health-check', (req: Request, 
  res: Response, 
  next: NextFunction) => {
  try {
    res.send('healthy!')
  } catch (err) {
    next(err);
  }
})

export default healthCheckRouter
