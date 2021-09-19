import loginService from "../../service/User/Login";
import { Request, Response } from 'express'
import ResponseBuilder from '../../utils/response-builder'


const loginController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    let responseBody = null;

    if (!username && !email) {
      throw new Error("username or email must provided")
    }

    if (!password) {
      throw new Error("password must provide")
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
      error.message,
      {},
      400,
      false
    )
    res.json(responseBody)
  }
}

export default loginController;