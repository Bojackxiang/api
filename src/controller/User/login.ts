import loginService from "../../service/User/Login";
import { Request, Response } from 'express'
import Result from "../../models/Result";
import ResponseBuilder from '../../utils/response-builder'


const loginController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    let responseBody = null;

    if (!username && !email) {
      res.status(400).json(Result.failure('Email or username is required'))
    }

    if (!password) {
      res.status(400).json(Result.failure('Password is required'))
    }

    const loginServiceResult = await loginService({ username, email, password });
    const { success, data, } = loginServiceResult;

    if (success) {
      responseBody = ResponseBuilder.buildResponse(
        'Login Successfully',
        {
          username: data.username,
          token: data.token
        }
      )
    } else {
      throw new Error(data);
    }

    res.json(responseBody)
  } catch (error: any) {
    const responseBody = ResponseBuilder.buildResponse(
      'Login Error',
      error.message,
      400,
      false
    )
    res.status(400).json(responseBody)
  }
}

export default loginController;