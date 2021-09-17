import express, { Request, Response, NextFunction } from 'express'
import mysql from 'mysql';
import RDSConnection from '../aws/RDS'
import User from '../models/User/User';

const healthCheckRouter = express.Router();

healthCheckRouter.get('/health-check', async (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    res.send('healthy!')
    
    const user = new User(
      'wwews',
      'password example',
      'wewse',
      "213s12",
      12,
      'unknown'
    );

    const result = await User.createUser(user);
    console.log(result)

  } catch (err) {
    console.log(err)
    next(err);
  }
})

export default healthCheckRouter