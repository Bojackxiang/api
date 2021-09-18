import Result, { IResult } from "../../models/IResult"
import User from "../../models/User/User"
import { generateJWT } from "../../utils/jwt"

interface UserLoginInterface {
  username?: string
  email?: string
  password: string

}
const loginService = async (loginInput: UserLoginInterface) => {
  try {
    const { username, email, password } = loginInput

    if (!username && !email) {
      throw new Error('Username or email is required')
    }

    if (!password) {
      throw new Error('Password is required')
    }

    const verifyResult = await User.verifyUserInfo({ username, email, password })
    const { success, data, message } = verifyResult as IResult;
    if (!success) {
      throw new Error(message)
    }

    const token = await generateJWT(data.username, data.password)

    return Result.success('Login Successfully', {
      ...data, 
      token,
    })

  } catch (error: any) {
    return Result.failure('Login Error', error.message)
  }
}

export default loginService