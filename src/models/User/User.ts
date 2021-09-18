import Result, { IResult } from '../IResult'
import generateUUID from '../../utils/uuid-generator';
import UserRDS from '../../aws/RDS'
import mysql from 'mysql'
import { comparePassword, encoding } from '../../utils/password-encoding';
import runQuery from '../../utils/sql';
import { query } from 'express';

export interface IUser {
  user_id: String;
  username: String;
  password: String;
  phone_num: String;
  email: String; // 当用户登录的时候是不需要 email 的
  age: Number; // 当用户登录的时候是不需要 email 的
  sex: 'male' | 'female' | 'unknown'
}

export interface ILoginUser {
  email?: string;
  username?: string;
  password: string
}

type genderOption = 'male' | 'female' | 'unknown'

class User implements IUser {
  user_id: String;
  username: String;
  password: String;
  email: String; // 当用户登录的时候是不需要 email 的
  age: Number; // 当用户登录的时候是不需要 email 的
  sex: genderOption
  phone_num: String

  constructor(
    username: String,
    password: String,
    email: String,
    phone_num: String,
    age: Number,
    sex: genderOption
  ) {
    this.user_id = generateUUID()
    this.username = username;
    this.password = password;
    this.phone_num = phone_num
    this.email = email;
    this.age = age;
    this.sex = sex;
  }

  static async checkUsernameExist(username: string) {
    try {
      return Result.success();
    } catch (error: any) {
      return Result.failure(error.message)
    }
  }

  
  static async verifyUserInfo(user: Partial<IUser>) {
    // 这边只是用户登录，和比较信息，jwt token 在 service 层添加
    try {

      const query = `
            SELECT username, email, password 
            FROM users.users
            WHERE 
                username = '${user.username}'
                OR
                username = '${user.email}'
            `;

      const handlerResult = async (result: any) => {
        const foundUser = result[0];
        if(!foundUser) return Result.failure("Not found user with given username / email", {})
        if (!user.password) throw new Error('Password is required')
        const passwordCompare = await comparePassword(
          foundUser.password,
          user.password as string);

        if (passwordCompare) {
          return Result.success("Verify Successfully", foundUser)
        } else {
          return Result.failure("Incorrect User Info")
        }
      }

      return await runQuery(query, handlerResult);

    } catch (error) {
      return Result.failure("Fail to verify user info", error)
    }
  }

  static async createUser(newUser: IUser) {
    try {
      const password = await encoding(newUser.password.toString());
      const user = new User(
        newUser.username,
        password as string,
        newUser.email,
        newUser.phone_num,
        newUser.age,
        newUser.sex,
      );
      const query = `INSERT INTO users.users (user_id, username, password, email, age, sex, phone_num) 
        VALUES ('${user.user_id}', '${user.username}', '${user.password}', '${user.email}', '${user.age}', '${user.sex}', '${user.phone_num}')`;

      const handlerResult = async (result: any) => {
        try {
          if (result && result.affectedRows >= 1) {
            return Result.success('User created successfully')
          }
          throw new Error ('Failure to create user')
        } catch (error: any) {
          return Result.failure(error.message)
        }
      }

      return await runQuery(query, handlerResult);

    } catch (error) {
      return Result.failure("Failure to create user", error)
    }

  }
}

export default User;