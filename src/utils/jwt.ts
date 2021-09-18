import jwt from 'jsonwebtoken';
import Base_config from '../config/base';


export const generateJWT = async (username: string, encodePassword: string) => {
  try {
    if (!username || !encodePassword) {
      throw new Error('Username and password are required');
    }
    console.log('here', username, encodePassword);
    const token = await jwt.sign(
      { username, encodePassword },
      'Base_config.secret');
    console.log(token)
    return token
  } catch (error) {
    throw error;
  }

}

export const parseJWT = (jwtToken: string) => {
  try {
    const decode = jwt.verify(jwtToken, Base_config.secret);
    console.log({ decode })
    if (decode) return decode;
  } catch (error) {
    throw error;
  }


}
