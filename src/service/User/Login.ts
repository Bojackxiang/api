import SessionToken from "../../dynamoDB/model/SessionToken"
import Result, { IResult } from "../../models/Result"
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

    // check if the session token is already in the dynamodb
    const sessionData = await SessionToken.checkExisting(data.username)
    if (!sessionData.session_id) {
      SessionToken.createSessionToken(data.username, token)
    }

    return Result.success('Login Successfully', {
      ...data,
      token,
    })

  } catch (error: any) {
    return Result.failure('Login Error', error.message)
  }
}

export default loginService


