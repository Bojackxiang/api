import loginService from "../../service/User/Login";
import { Request, Response } from 'express'
import Result from "../../models/IResult";


const loginController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    let result = null;

    if (!username && !email) {
      res.status(400).json(Result.failure('Email or username is required'))
    }

    if (!password) {
      res.status(400).json(Result.failure('Password is required'))
    }

    const loginServiceResult = await loginService({ username, email, password });
    const {success,  data, message } = loginServiceResult;
    
    if (success) {
      result = Result.success('Login Successfully', {
        username: data.username,
        token: data.token
      })
    } else {
      throw new Error(data);
    }

    res.json(result)
  } catch (error: any) {
    // TODO 建立一个 response 体系
    console.log(error)
    res.status(400).send(error.message)
  }
}

export default loginController;