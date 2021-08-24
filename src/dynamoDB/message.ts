import AWS from 'aws-sdk'
import awsConfig from '../config/aws.config'
import Message from '../models/Message';
import { v4 as uuidv4, v4 } from 'uuid';

AWS.config.update({
  region: awsConfig.region,
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey
});

const dbClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'messages'

class MessageDB_AWS_DynamoDB {
  // 获取所有的 items
  static async scan() {
    const params = {
      TableName: tableName
    };
    return (await dbClient.scan(params).promise()).Items;
  }

  // 根据 id 添加活着 更新 item
  static async addOrUpdateMessage(message: string, id?: string) {
    let generatedId = id ?? await v4()
    
    const params = {
      TableName: tableName,
      Item: {
        message_id: generatedId,
        message: 'message'
      }
    };
    return await dbClient.put(params).promise()

  }

  // 通过 id 来查找一个 message
  static async getOneMessageById(id: String){
    const param = {
      TableName: 'messages',
      Key: {
        // message_id: '123213'
        message_id: id
      }
    }
    return (await dbClient.get(param).promise()).Item
  }

  // 通过 id delete message
  static async deleteMessageById(id: String){
    // await MessageDB.addOrUpdateMessage("这是一个简单的测试", '9900')
    const param = {
      TableName: 'messages',
      Key: {
        message_id: '9900'
      }
    }
    return await dbClient.delete(param).promise(); 
  }
}

export default MessageDB_AWS_DynamoDB;