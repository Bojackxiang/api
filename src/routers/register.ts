import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User/User';

export default async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    // await User.register({ email, password });
    res.json()
  } catch (error: any) {
    next(error.message)
  }
};

