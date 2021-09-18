import Result, { IResult } from "../../models/Result"
import User from "../../models/User/User"

interface UserLoginInterface {
  username?: string
  email?: string
  password: string,
  phone_num?: string

}
const registerService = async (loginInput: UserLoginInterface) => {
  try {
    const { username, email, password, ...properties } = loginInput

    if (!username || !email || !password) {
      throw new Error('Username, email and password are required')
    }

    const createResult = await User.createUser({
      username: username ?? '', 
      email: email ?? '', 
      password,
      ...properties
    });

    const { success, data, message } = createResult as IResult;
    
    if (!success) {
      throw new Error(message)
    }

    return Result.success('Create User successfully', data);

  } catch (error: any) {
    return Result.failure('Register Error', error.message)
  }
}

export default registerService