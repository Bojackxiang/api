import bcrypt from 'bcrypt'
import Base_Config from '../config/base'

export const encoding = async (input: string) => {
  return await (new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10)
    bcrypt.hash(input, salt).then(function (hash) {
      if (hash) {
        resolve(hash)
      } else {
        reject('加密出错')
      }
    });
  }))
}


export const comparePassword = async (encodePassword: string, password: string) => {
    return await (new Promise((resolve, reject) => {
      bcrypt.compare(password, encodePassword).then(function (res) {
        resolve(res)
      });
    }))
}