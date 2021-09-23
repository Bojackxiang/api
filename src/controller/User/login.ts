import loginService from "../../service/User/Login";
import { Request, Response } from 'express'
import ResponseBuilder from '../../utils/response-builder'
import cookie from 'cookie'

const TOKEN_NAME = 'userToken'
const COOKIE_CONFIG = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7
}

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

    // set the response cookie
    const TOKEN = responseBody.data.token
    res.setHeader('Set-Cookie', cookie.serialize(TOKEN_NAME, TOKEN, COOKIE_CONFIG));

    res.json(responseBody.data.token)
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