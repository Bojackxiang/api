import AWS from 'aws-sdk'
import awsConfig from '../../config/aws.config'
import { v4 } from 'uuid';
import Result from '../../models/IResult';
import { DocumentClient, Key } from 'aws-sdk/clients/dynamodb';

AWS.config.update({
  region: awsConfig.region,
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey
});

const dbClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'messages'

interface IMessage {
  name: string;
  phone?: string;
  email?: string;
  message: string,
  getName: string;
  getPhone: string;
  getEmail: string;
  getMessage: string;
}

export interface IMessageInput {
  message: string;
  phone: string;
  email: string;
  name: string;
}

class Message implements IMessage {
  name: string;
  message: string;
  phone: string;
  email: string;

  constructor(name: string = '',
    message: string = '',
    phone: string = '',
    email: string = '') {

    this.name = name;
    this.message = message;
    this.phone = phone;
    this.email = email;
  }

  get getName() {
    return this.name;
  }
  get getMessage() {
    return this.message;
  }
  get getPhone() {
    return this.phone;
  }
  get getEmail() {
    return this.email;
  }

  // 创建 message
  static async createMessage(name: string, message: string, phone: string, email: string) {

    try {
      const msg: IMessage = new Message(name, message, phone, email);
      let uuid = await v4()

      // 生成 message 数据
      const params = {
        TableName: tableName,
        Item: {
          message_id: uuid,
          message: msg.getMessage,
          phone: msg.getPhone,
          email: msg.getEmail,
          name: msg.getName,
          createdAt: new Date().toISOString()
        }
      };
      console.log({ uuid })
      await dbClient.put(params).promise()

      return uuid
    } catch (error) {
      return Result.failure(error.message)
    }


  }

  // 查找所有的 message 
  static async listMessage(pageSize: number = 10, startKey?: Key) {

    const params: DocumentClient.ScanInput = {
      TableName: tableName,
      Limit: pageSize,
    }

    if (startKey) {
      params.ExclusiveStartKey = {
        message_id: startKey
      };
    }
    return (await dbClient.scan(params).promise()).Items;

  }



}

export default Message