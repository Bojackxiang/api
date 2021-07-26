import firebase from "firebase";
import { firebaseConfig } from "../config/gcp.config";
import { generate_UUID } from "../utils";

class FirebaseApp {
  private firebaseDatabase: firebase.database.Database;
  
  get getFirebaseDatabase() {
    return this.firebaseDatabase;
  }

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.firebaseDatabase = firebase.database();
  }

  async writeData(collectionName: String, data: Object) {
    const result = {
      success: true,
      message: undefined
    }
    try {
      const uuid = generate_UUID()
      await this.firebaseDatabase
        .ref(`${collectionName}/${uuid}`)
        .set({
          ...data
        });
      return result
    } catch (error) {
      result.message = error.message;
      return result
    }
  }

  async testWrite() {
    try {
      if (!this.firebaseDatabase) {
        throw new Error('No database client ')
      }
      await this.writeData('messages', { author: 'alex', message: 'world' })
    } catch (error) {
    }
  }

  async testAllRead() {
    const result = {
      success: true,
      message: undefined
    }
    try {
      if (!this.firebaseDatabase) {
        throw new Error('No database client ')
      }
      const snapShot = await this.firebaseDatabase.ref('messages').once('value');
      const values = snapShot.val();
      console.log(values);
      
    } catch (error) {
      console.log(error);
      result.message = error.message;
      return result;
    }
    // read from message
  }

  async testReadDataById(id: String){
    try {
      if (!this.firebaseDatabase) {
        throw new Error('No database client ')
      }
      const snapShot = await this.firebaseDatabase.ref('messages/ff5417f9-e913-429b-b93b-45942a9e8223').once('value');
      const value = snapShot.val();
      console.log(value);
    } catch (error) {
      console.log(error)
    }
  }
}
export default new FirebaseApp();
