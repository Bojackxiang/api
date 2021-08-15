import Result, { IResult } from './IResult'

export interface IUser {
  username: String;
  password: String;
  email: String; // 当用户登录的时候是不需要 email 的
}

export interface ILoginUser {
  email?: string; 
  username?: string; // 
  password: string
}


class User implements IUser {
  username: String;
  password: String;
  email: String;

  constructor(username: String, password: String, email: String) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  static async checkUsernameExist(username: string) {
    try {
      return Result.success();
    } catch (error) {
      return Result.failure(error.message)
    }
  }

  static async login(user: ILoginUser) {
    try {
      return Result.success();
    } catch (error) {
      return Result.failure(error.message)
    }
  }

  async register(user: IUser) {
    try {
      return Result.success();
    } catch (error) {
      return Result.failure(error.message)
    }
  }
}

export default User;