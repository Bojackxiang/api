import FirebaseClient from '../firebase'
import { generate_UUID } from "../utils";

export interface IMessage {
  body: String;
  authorId: String;
  phone: String;
  email: String;
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
      if(!message.body || !message.phone || !message.email){
        throw new Error("Invalid message body")
      }
      const firebaseClient = FirebaseClient.getFirebaseDatabase;

      await firebaseClient
        .ref(`messages-collection/${generate_UUID()}`)
        .set({
          message: message.body,
          authorId: message.authorId || '',
          phone: message.phone,
          email: message.email,
        })
      
        return result; 
    } catch (error) {
      result.success = false; 
      result.message = error.message;
      return result;
    }


  }

}export default Message;