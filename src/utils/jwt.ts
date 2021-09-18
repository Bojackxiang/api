import jwt from 'jsonwebtoken';
import Base_config from '../config/base';


export const generateJWT = async (username: string, encodePassword: string) => {
  try {
    if (!username || !encodePassword) {
      throw new Error('Username and password are required');
    }
    const token = await jwt.sign(
      { username, encodePassword },
      'Base_config.secret');
    return token
  } catch (error) {
    throw error;
  }

}

export const parseJWT = (jwtToken: string) => {
  try {
    const decode = jwt.verify(jwtToken, Base_config.secret);
    if (decode) return decode;
  } catch (error) {
    throw error;
  }


}
