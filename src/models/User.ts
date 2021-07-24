import {} from 'firebase'

interface IUser {
  username: String;
  password: String;
  email: String;
}

interface ILoginInputs {
  password: String;
  email: String;
}

interface IRegister {
  email: String;
  password: String;
}

class User {
  username: String;
  password: String;
  email: String;

  constructor(username: String, password: String, email: String) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  static async login(loginInputs: ILoginInputs) {
    return {
      email: loginInputs.email,
      success: true
    }
  }

  static async register(user: IRegister) {
    try {
      ``
    } catch (error) {
      throw new Error(error.message)  
    }
    
  }
}

export default User;