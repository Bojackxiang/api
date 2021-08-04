import FirebaseClient from '../firebase'
import { generate_UUID } from "../utils";

export interface IMessage {
  message: String;
  phone: String;
  email: String;
  name:String;
}

class Message {
  constructor() {

  }

  static async addMessage(message: IMessage) {
    const result = {
      success: true,
      message: undefined,
    }
    try {
      console.log('in')
      if(!message.message || !message.name){
        throw new Error("Name and message are required")
      }
      const firebaseClient = FirebaseClient.getFirebaseDatabase;

      await firebaseClient
        .ref(`messages-collection/${generate_UUID()}`)
        .set({
          message: message.message,
          phone: message.phone,
          email: message.email,
          created_at: new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"})
        })
      
        return result; 
    } catch (error) {
      result.success = false; 
      result.message = error.message;
      return result;
    }


  }

}export default Message;