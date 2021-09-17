import Result, { IResult } from '../IResult'
import generateUUID from '../../utils/uuid-generator';
import UserRDS from '../../aws/RDS'
import mysql from 'mysql'
import { comparePassword, encoding } from '../../utils/password-encoding';

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
  username?: string; // 
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

  static async login(user: ILoginUser) {
    // 这边只是用户登录，和比较信息，jwt token 在 service 层添加
    return new Promise((resolve, reject) => {
      const pool = UserRDS.getPool;

      const query = `
            SELECT username, email, password 
            FROM users.users
            WHERE 
                username = '${user.username}'
                OR
                username = '${user.email}'
            `;

      pool.getConnection((err: any, connection: mysql.PoolConnection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(query, async (err, result) => {
            if (err) {
              reject(err);
            } else {
              if (result.length === 0) {
                resolve(Result.failure("用户不存在"));
              } else {
                const foundUser = result[0];
                const passwordCompare = await comparePassword(foundUser.password,
                  user.password);
                if (passwordCompare) {
                  resolve(Result.success("登录成功", foundUser))
                } else {
                  reject(Result.failure("用户信息不正确"))
                }
              }
            }
          })
        }
        connection.release();

      })


    })
  }


  static async createUser(newUser: IUser) {
    return new Promise(async (resolve, reject) => {
      const pool = UserRDS.getPool;
      if (pool) {
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

        pool.getConnection(
          (err: any, connection: mysql.PoolConnection) => {
            if (err) reject(Result.failure("", err))
            connection.query(query, (error, results, fields) => {
              if (error) {
                reject(Result.failure("", error))
              }
              // console.log(pool._freeConnections.indexOf(connection))
              connection.release()
              resolve(Result.success("创建用户成功", error))
            });
          }
        )
      } else {
        reject("没有找到 Pool")
      }

    })
  }
}

export default User;