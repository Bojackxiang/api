import express from 'express'
import loginController from '../controller/User/login';
import registerController from '../controller/User/register';

const userRouter = express.Router();

userRouter.post('/user/login', loginController)
userRouter.post('/user/register', registerController)

export default userRouter;