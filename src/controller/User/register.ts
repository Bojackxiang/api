import { Request, Response } from 'express'
import Result from "../../models/Result";
import registerService from '../../service/User/Create';
import ResponseBuilder from '../../utils/response-builder'


const registerController = async (req: Request, res: Response) => {
  try {
    // validation 
    const { username, email, password, ...properties } = req.body;
    let responseBody = null;

    if (!username || !email || !password) {
      res.status(400).json(Result.failure('Username, Email and password are required'))
    }

    // service and handler result
    const createResult = await registerService({
      username,
      email,
      password,
      ...properties,
    });

    const { success, data, } = createResult;
    if (success) {
      responseBody = ResponseBuilder.buildResponse(
        'Create User Successfully',
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
    res.status(400).json(responseBody)
  }
}

export default registerController;