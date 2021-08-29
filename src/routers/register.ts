import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export default async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    // await User.register({ email, password });
    res.json()
  } catch (error) {
    next(error.message)
  }
};

