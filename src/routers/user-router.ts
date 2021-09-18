import express from 'express'
import loginController from '../controller/User/login';

const userRouter = express.Router();

userRouter.post('/user/login', loginController)

export default userRouter;